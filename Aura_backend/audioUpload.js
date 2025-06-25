require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { MongoClient, GridFSBucket } = require("mongodb");
const Meditation = require("./src/models/Meditation");
const Image = require("./src/models/Image");

const mongoURI = process.env.MONGO_URI;
const audioDir = path.join(__dirname, "src", "uploads", "audio");
const imageDir = path.join(__dirname, "src", "uploads", "images");

async function uploadImagesAndLink() {
  await mongoose.connect(mongoURI);
  const client = await MongoClient.connect(mongoURI);
  const db = client.db();
  const imageBucket = new GridFSBucket(db, { bucketName: "images" });

  // 1. Upload images to GridFS and create Image docs
  const imageFiles = fs.readdirSync(imageDir);
  const images = [];
  for (const file of imageFiles) {
    const fullPath = path.join(imageDir, file);
    const uploadStream = imageBucket.openUploadStream(file);
    const fileStream = fs.createReadStream(fullPath);

    await new Promise((resolve, reject) => {
      fileStream.pipe(uploadStream).on("error", reject).on("finish", resolve);
    });

    const imageDoc = await Image.create({
      filename: file,
      gridfsId: uploadStream.id,
    });
    images.push(imageDoc);
    console.log(`✅ Uploaded image: ${file}`);
  }

  // 2. Link images to meditations (randomly or by your logic)
  const meditations = await Meditation.find();
  for (const meditation of meditations) {
    // Pick a random image
    const randomImage = images[Math.floor(Math.random() * images.length)];
    meditation.image = randomImage._id;
    await meditation.save();

    // Optionally, link meditation to image
    randomImage.meditation = meditation._id;
    await randomImage.save();

    console.log(
      `🔗 Linked image ${randomImage.filename} to meditation ${meditation.title}`
    );
  }

  await mongoose.disconnect();
  await client.close();
}

uploadImagesAndLink().catch(console.error);
