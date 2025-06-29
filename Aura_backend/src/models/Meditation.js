//models/Meditation.js

const mongoose = require("mongoose");

const MeditationSchema = new mongoose.Schema({
  title: String,
  description: String,
  filename: String,
  duration: Number,
  audioGridFsId: mongoose.Schema.Types.ObjectId,
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
});

module.exports = mongoose.model("Meditation", MeditationSchema);
