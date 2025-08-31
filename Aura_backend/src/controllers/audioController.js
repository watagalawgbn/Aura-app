//controllers/audioController.js

const { GridFSBucket } = require("mongodb");
const mongoose = require("mongoose");

exports.streamAudioByFilename = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "audios" });
    
    // find file info in audios.files collection
    const files = await db.collection("audios.files").find({ filename: req.params.filename }).toArray();
    if (!files || files.length === 0) return res.status(404).send("File not found");

    const file = files[0];
    const range = req.headers.range; //check if client asks for partial data
    const contentLength = file.length;

    if (range) {
      //handle partial audio
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : contentLength - 1;

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${contentLength}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Content-Type": "audio/mpeg",
      });

      //stream only requested part
      bucket.openDownloadStreamByName(req.params.filename, { start, end: end + 1 }).pipe(res);
    } else {
      //stream full audio
      res.writeHead(200, {
        "Content-Length": contentLength,
        "Content-Type": "audio/mpeg",
      });
      bucket.openDownloadStreamByName(req.params.filename).pipe(res);
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Server error");
  }
};
