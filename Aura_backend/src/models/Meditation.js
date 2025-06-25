//models/Meditation.js

const mongoose = require("mongoose");

const MeditationSchema = new mongoose.Schema({
    title: String,
    description: String,
    filename: String,
    duration: Number,
});

module.exports = mongoose.model("Meditation", MeditationSchema);