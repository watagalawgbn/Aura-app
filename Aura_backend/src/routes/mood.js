const express = require("express");
const { addMood, getMoods } = require("../controllers/moodController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, addMood);
router.get("/", authenticateToken, getMoods);

module.exports = router;