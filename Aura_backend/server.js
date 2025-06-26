require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const cors = require("cors");
const { connectGridFs, getGfs } = require("./gridfs");
const { MongoClient, GridFSBucket } = require("mongodb");

const Meditation = require("./src/models/Meditation");
const Image = require("./src/models/Image"); 
const auth = require("./src/routes/auth");
const assessmentRoutes = require("./src/routes/assessmentRoutes");
const moods = require("./src/routes/mood");
const taskRoutes = require("./src/routes/taskRoutes");
const breathingSessionRoutes = require("./src/routes/breathingSessionRoutes");

const app = express();
connectDB();
app.use(cors({ origin: "*" }));
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
connectGridFs(mongoURI);
mongoose.connect(mongoURI);

app.get("/api/audio/:filename", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "audios" });

    // Find the file first (optional, for error handling)
    const files = await db
      .collection("audios.files")
      .find({ filename: req.params.filename })
      .toArray();
    if (!files || files.length === 0) {
      return res.status(404).send("File not found");
    }

    res.set("Content-Type", "audio/mpeg"); // or use files[0].contentType if set
    const downloadStream = bucket.openDownloadStreamByName(req.params.filename);

    downloadStream.on("error", () => res.status(404).send("File not found"));
    downloadStream.pipe(res);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Server error");
  }
});

app.get("/api/meditations", async (req, res) => {
  try {
    const meditations = await Meditation.find().populate("image");
    
    // Transform the response to include image IDs properly
    const meditationsWithImageIds = meditations.map(meditation => ({
      _id: meditation._id,
      title: meditation.title,
      description: meditation.description,
      filename: meditation.filename,
      duration: meditation.duration,
      image: meditation.image ? meditation.image._id.toString() : null
    }));
    
    res.json(meditationsWithImageIds);
  } catch (err) {
    console.error("Error fetching meditations:", err);
    res.status(500).json({ error: "Failed to fetch meditations" });
  }
});

app.get("/api/images/:imageId", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const imageBucket = new GridFSBucket(db, { bucketName: "images" });
    
    // Convert string ID to ObjectId
    const objectId = new mongoose.Types.ObjectId(req.params.imageId);
    
    // Find the image document first
    const imageDoc = await Image.findById(objectId);
    if (!imageDoc) {
      return res.status(404).send("Image not found");
    }
    
    // Find the GridFS file
    const files = await db
      .collection("images.files")
      .find({ _id: imageDoc.gridfsId })
      .toArray();
      
    if (!files || files.length === 0) {
      return res.status(404).send("File not found in GridFS");
    }
    
    // Set appropriate headers
    res.set({
      'Content-Type': files[0].contentType || 'image/jpeg',
      'Content-Length': files[0].length
    });
    
    // Stream the file
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
});

app.use("/api/auth", auth);
app.use("/api/moods", moods);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/breathing-sessions", breathingSessionRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
