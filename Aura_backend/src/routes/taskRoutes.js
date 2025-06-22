// routes/taskRoutes.js

const express = require("express");
const router = express.Router();
const {
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
