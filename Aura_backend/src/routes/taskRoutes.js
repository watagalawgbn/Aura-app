// routes/taskRoutes.js

const express = require("express");
const router = express.Router();
const {
  addTask,
  updateTask,
  deleteTask,
  getTasks, 
  toggleCompletion
} = require("../controllers/taskController");
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/", getTasks);
router.patch("/:id", toggleCompletion);


module.exports = router;
