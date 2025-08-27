//routes/assessmentRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAssessmentQuestions,
  submitAssessment,
} = require("../controllers/assessmentController");
const authenticateToken = require("../middleware/authMiddleware");

// Get shuffled assessment questions
router.get("/", getAssessmentQuestions);

// Submit assessment answers
router.post("/submit", authenticateToken, submitAssessment);

module.exports = router;
