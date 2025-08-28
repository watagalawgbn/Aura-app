//models/Meditation.js

const mongoose = require("mongoose");

const MeditationSchema = new mongoose.Schema({
  title: String,
  description: String,
  filename: String,
  duration: Number,
  audioGridFsId: mongoose.Schema.Types.ObjectId, //link to audio file in GridFS
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" }, //linked image
  categories: [String],
});

module.exports = mongoose.model("Meditation", MeditationSchema);
