//server.js
require("dotenv").config({ path: '../.env' });
const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const { connectGridFs } = require("./gridfs");

const auth = require("./src/routes/auth");
const assessmentRoutes = require("./src/routes/assessmentRoutes");
const moods = require("./src/routes/mood");
const taskRoutes = require("./src/routes/taskRoutes");
const breathingSessionRoutes = require("./src/routes/breathingSessionRoutes");
const audioRoutes = require("./src/routes/audioRoutes");
const meditationRoutes = require("./src/routes/meditationRoutes");
const imageRoutes = require("./src/routes/imageRoutes");
const sleepRoutes = require("./src/routes/sleepRoutes");
const jobRoutes = require("./src/routes/jobRoutes");

const app = express();
const mongoURI = process.env.MONGO_URI;
connectDB();
connectGridFs(mongoURI);

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/audio", audioRoutes);
app.use("/api/meditations", meditationRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/auth", auth);
app.use("/api/moods", moods);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/breathing-sessions", breathingSessionRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/sleep", sleepRoutes);
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
