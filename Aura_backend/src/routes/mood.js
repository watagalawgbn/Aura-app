//routes/mood.js

const express = require("express");
const { addMood, getMoods } = require("../controllers/moodController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authenticateToken);

router.post("/", addMood);
router.get("/", getMoods);

module.exports = router;