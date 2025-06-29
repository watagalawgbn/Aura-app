//controllers/imageController.js

const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const Image = require("../models/Image");

exports.streamImageById = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const imageBucket = new GridFSBucket(db, { bucketName: "images" });

    const objectId = new mongoose.Types.ObjectId(req.params.imageId);
    const imageDoc = await Image.findById(objectId);
    if (!imageDoc) return res.status(404).send("Image not found");

    const files = await db
      .collection("images.files")
      .find({ _id: imageDoc.gridfsId })
      .toArray();

    if (!files || files.length === 0) {
      return res.status(404).send("File not found in GridFS");
    }

    res.set({
      'Content-Type': files[0].contentType || 'image/jpeg',
      'Content-Length': files[0].length
    });

    const downloadStream = imageBucket.openDownloadStream(imageDoc.gridfsId);

    downloadStream.on("error", (err) => {
      console.error("Download stream error:", err);
      if (!res.headersSent) {
        res.status(404).send("File not found");
      }
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error("Error serving image:", err);
    if (!res.headersSent) {
      res.status(500).send("Server error");
    }
  }
};
