// models/BreathingSession.js
const mongoose = require("mongoose");

const breathingSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  duration: { type: Number, required: true }, // in seconds
  pattern: {
    inhale: Number,
    hold: Number,
    exhale: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("BreathingSession", breathingSessionSchema);
