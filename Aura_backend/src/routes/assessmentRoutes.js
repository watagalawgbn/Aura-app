//routes/assessmentRoutes.js

const express = require("express");
const router = express.Router();
const { getShuffledQuestions } = require("../services/assessmentService");
const { calculateScores } = require("../services/scoringService");
const AssessmentResult = require("../models/AssessmentResult");

router.get("/", (req, res) => {
  const shuffledQuestions = getShuffledQuestions();
  res.json(shuffledQuestions);
});

router.post("/submit", async (req, res) => {
  try {
    const { userId, answers } = req.body;

    const scores = calculateScores(answers);

    const newResult = new AssessmentResult({
      userId,
      scores,
      rawResponses: answers.map((a) => ({
        questionId: a.id,
        questionType: a.type,
        answer: a.answer,
      })),
    });

    await newResult.save();
    res.json({ message: "Assessment submitted successfully", scores });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
