require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const mongoose = require("mongoose");
const { MongoClient, GridFSBucket } = require("mongodb");
const Meditation = require("./src/models/Meditation");
const Image = require("./src/models/Image");

const mongoURI = process.env.MONGO_URI;
const audioDir = path.join(__dirname, "src", "uploads", "audio");
const imageDir = path.join(__dirname, "src", "uploads", "images");

console.log("Uploading from directory:", audioDir);
console.log("Audio files:", fs.readdirSync(audioDir));
console.log("Image files:", fs.readdirSync(imageDir));

async function getDurationSeconds(filePath) {
  try {
    const output = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`);
    return parseFloat(output.toString().trim());
  } catch (err) {
    console.log('Error getting duration for file:', filePath, err.message);
    return null;
  }
}

async function uploadImagesAndAudios() {
  await mongoose.connect(mongoURI);
  const client = await MongoClient.connect(mongoURI);
  const db = client.db();
  const imageBucket = new GridFSBucket(db, { bucketName: "images" });
  const audioBucket = new GridFSBucket(db, { bucketName: "audios" });

  const imageFiles = fs.readdirSync(imageDir);
  const audioFiles = fs.readdirSync(audioDir);

  if (audioFiles.length > imageFiles.length) {
    console.warn("More audio files than images. Some audios won't get a unique image.");
  }

  for (let i = 0; i < audioFiles.length; i++) {
    const audioFile = audioFiles[i];
    const imageFile = imageFiles[i];

    const audioFullPath = path.join(audioDir, audioFile);
    const imageFullPath = imageFile ? path.join(imageDir, imageFile) : null;

    // Upload audio to GridFS
    const audioUploadStream = audioBucket.openUploadStream(audioFile);
    const audioStream = fs.createReadStream(audioFullPath);
    await new Promise((resolve, reject) => {
      audioStream.pipe(audioUploadStream).on("error", reject).on("finish", resolve);
    });

    const durationSec = await getDurationSeconds(audioFullPath);
    const title = path.parse(audioFile).name;

    // Create Meditation
    const meditation = await Meditation.create({
      title,
      description: "",
      filename: audioFile,
      duration: durationSec ? Math.round(durationSec) : undefined,
      audioGridFsId: audioUploadStream.id,
    });
    console.log(`Uploaded and created meditation for audio: ${audioFile}`);

    // Upload and link image if available
    if (imageFullPath) {
      const imageUploadStream = imageBucket.openUploadStream(imageFile);
      const imageStream = fs.createReadStream(imageFullPath);
      await new Promise((resolve, reject) => {
        imageStream.pipe(imageUploadStream).on("error", reject).on("finish", resolve);
      });

      const imageDoc = await Image.create({
        filename: imageFile,
        gridfsId: imageUploadStream.id,
        meditation: meditation._id,
      });

      meditation.image = imageDoc._id;
      await meditation.save();

      console.log(`Linked image "${imageFile}" to meditation "${title}"`);
    } else {
      console.log(`No image available for "${audioFile}"`);
    }
  }

  await mongoose.disconnect();
  await client.close();
}

uploadImagesAndAudios().catch(console.error);
