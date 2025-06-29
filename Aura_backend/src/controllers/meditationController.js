//controllers/meditationController.js

const Meditation = require("../models/Meditation");

exports.getAllMeditations = async (req, res) => {
  try {
    const meditations = await Meditation.find().populate("image");

    const response = meditations.map(meditation => ({
      _id: meditation._id,
      title: meditation.title,
      description: meditation.description,
      filename: meditation.filename,
      duration: meditation.duration,
      image: meditation.image ? meditation.image._id.toString() : null
    }));

    res.json(response);
  } catch (err) {
    console.error("Error fetching meditations:", err);
    res.status(500).json({ error: "Failed to fetch meditations" });
  }
};
