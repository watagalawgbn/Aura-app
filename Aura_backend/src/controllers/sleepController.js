//controllers/sleepController.js

const Sleep = require("../models/Sleep");
const mongoose = require("mongoose");

//get all sleep records
exports.getSleepData = async (req, res) => {
  console.log("🔍 getSleepData endpoint hit!");
  console.log("🔍 User from token:", req.user);

  try {
    console.log("🔍 getSleepData called for user:", req.user.id);
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const data = await Sleep.find({ userId }).sort({ date: 1 });
    console.log("📊 Found sleep data:", data);
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching sleep data:", err);
    res.status(500).json({ message: "Error fetching sleep data" });
  }
};

//get all sleep data by date
exports.getSleepByDate = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.user.id);
    const { date } = req.params;
    const data = await Sleep.find({ userId, date });
    if (!data) res.status(404).json({ message: "No data for this date!" });
    res.json(data);
  } catch (err) {
    console.error("Error fetching sleep data by date", err);
    res.status(500).json({ message: "Error fetching sleep data by date" });
  }
};

//add or update sleep data
exports.postSleepData = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: no user in request" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);
    const { date, hours, startTime, endTime } = req.body;
    console.log("Incoming sleep record:", {
      userId,
      date,
      hours,
      startTime,
      endTime,
    });

    if (!date || hours == null) {
      return res.status(400).json({ message: "Date and hours are required" });
    }

    const existing = await Sleep.findOne({ userId, date });

    if (existing) {
      existing.hours = hours;
      await existing.save();
      res.json({ message: "Sleep data", data: existing });
    } else {
      const newSleepData = new Sleep({
        userId,
        date,
        hours,
        startTime,
        endTime,
      });
      await newSleepData.save();
      res.status(201).json({ message: "Slepp data saved", data: newSleepData });
    }
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ messsage: "Error saving data" });
  }
};
