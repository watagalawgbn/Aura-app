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
const audioRoutes = require("./src/routes/audioRoutes");
const meditationRoutes = require("./src/routes/meditationRoutes");
const imageRoutes = require("./src/routes/imageRoutes");

const app = express();
connectDB();
app.use(cors({ origin: "*" }));
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
connectGridFs(mongoURI);
mongoose.connect(mongoURI);

app.use("/api/audio", audioRoutes);
app.use("/api/meditations", meditationRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/auth", auth);
app.use("/api/moods", moods);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/breathing-sessions", breathingSessionRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
