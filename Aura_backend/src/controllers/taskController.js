// controllers/taskController.js

const Sleep = require("../models/Sleep");
const Task = require("../models/Task");
const { getMaxWorkLoad } = require("../utils/workloadRules");

exports.addTask = async (req, res) => {
  try {
    const { name, note, userId, override } = req.body;

    const latestSleep = await Sleep.findOne({ userId }).sort({ date: -1 });
    console.log("latest sleep: ",latestSleep);
    let allowedMinutes = 300; // default max
    if (latestSleep) {
      allowedMinutes = getMaxWorkLoad(latestSleep.hours);
      console.log("Allowed Minutes: ",allowedMinutes);
    } 

    const existingTasks = await Task.find({ userId });
    console.log("existing Tasks: ",existingTasks);
    const usedMinutes = existingTasks.length * 25;
    console.log("used Minutes: ",usedMinutes);

    if (usedMinutes + 25 > allowedMinutes && !override) {
      return res.status(403).json({
        message: `Sleep < ${latestSleep.hours}h. Recommended workload is ${allowedMinutes} mins. Override required.`,
        allowedMinutes,
        usedMinutes,
      });
    }

    const task = new Task({ name, note, userId });
    await task.save();

    res.status(201).json({ task, overrideUsed: override || false });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
