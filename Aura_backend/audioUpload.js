//audioUpload.js

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { MongoClient, GridFSBucket } = require("mongodb");
const Meditation = require("./src/models/Meditation");

const mongoURI = process.env.MONGO_URI;
console.log("Connecting to MongoDB at:", mongoURI);
const audioDir = path.join(__dirname, "src", "uploads");
console.log("Uploading from directory:", audioDir);
console.log("Files found:", fs.readdirSync(audioDir));

mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("MongoDB connected");

    const client = await MongoClient.connect(mongoURI);
    const db = client.db(); 
    const bucket = new GridFSBucket(db, { bucketName: "audios" });

    const files = fs.readdirSync(audioDir);
    console.log(`files to upload:`, files);

    for (const file of files) {
      const fullPath = path.join(audioDir, file);
      const uploadStream = bucket.openUploadStream(file);
      const fileStream = fs.createReadStream(fullPath);

      await new Promise((resolve, reject) => {
        fileStream.pipe(uploadStream).on("error", reject).on("finish", resolve);
      });

      console.log(`Uploaded file: ${file}`);
      await Meditation.create({
        title: path.basename(file, path.extname(file)),
        description: "Soothing Audio",
        filename: file,
        duration: 180,
      });
      console.log(`✅ Uploaded: ${file}`);
    }

    await mongoose.disconnect();
    await client.close();
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
