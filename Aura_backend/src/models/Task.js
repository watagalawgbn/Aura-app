//models/Tasks.js

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
