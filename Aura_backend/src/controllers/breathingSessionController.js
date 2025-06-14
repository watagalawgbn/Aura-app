// controllers/breathingSessionController.js
const BreathingSession = require("../models/BreathingSession");

exports.saveSession = async (req, res) => {
  try {
    const { userId, duration, pattern } = req.body;

    const session = new BreathingSession({ userId, duration, pattern });
    await session.save();

    res.status(201).json({ message: "Session saved", session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving session" });
  }
};
