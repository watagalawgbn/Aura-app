// controllers/taskController.js

const Sleep = require("../models/Sleep");
const Task = require("../models/Task");
const { getMaxWorkLoad } = require("../utils/workloadRules");

exports.addTask = async (req, res) => {
  try {
    const { name, note, userId, override } = req.body;

    const today = new Date().toISOString().split("T")[0];//today range
    //check for today's sleep record
    let sleepRecord = await Sleep.findOne({ userId, date: today });
    //if no today record, fallback to latest
    if (!sleepRecord) {
      sleepRecord = await Sleep.findOne({ userId }).sort({ date: -1 });
    }
    //if still no record, ask frontend to request sleep input
    if (!sleepRecord) {
      return res
        .status(409)
        .json({
          message:
            "No sleep record found.please log your sleep hours before adding tasks.",
        });
    }
    //calculate workload
    const allowedMinutes = getMaxWorkLoad(sleepRecord.hours);
    console.log("Allowed Minutes: ", allowedMinutes);

    //only count today's tasks
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingTasks = await Task.find({
      userId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });
    console.log("existing Tasks: ", existingTasks);

    const usedMinutes = existingTasks.length * 25;
    console.log("used Minutes: ", usedMinutes);

    //if exceeded and no override then, block
    if (usedMinutes + 25 > allowedMinutes && !override) {
      return res.status(403).json({
        message: `Sleep < ${sleepRecord.hours}h. Recommended workload is ${allowedMinutes} mins. Override required.`,
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

exports.getTasks = async (req, res) => {
  try {
    const { userId } = req.query; // expecting ?userId=xxx
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Calculate today's date range
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Find tasks for user created today
    const tasks = await Task.find({
      userId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ createdAt: -1 });
    console.log(`Fetched ${tasks.length} tasks for user ${userId}`);
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};