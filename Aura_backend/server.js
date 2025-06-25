require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const cors = require("cors");
const { connectGridFs, getGfs } = require("./gridfs");

const Meditation = require("./src/models/Meditation");
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

app.get("/audio/:filename", async (req, res) => {
  const gfs = getGfs();
  if (!gfs) return res.status(500).send("GridFS not ready");

  const file = await gfs.files.findOne({ filename: req.params.filename });
  if (!file) return res.status(404).send("File not found");

  res.set("Content-Type", "audio/mpeg");
  const readStream = gfs.createReadStream(file.filename);
  readStream.pipe(res);
});

app.get("/api/meditations", async (req, res) => {
  const data = await Meditation.find();
  res.json(data);
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
