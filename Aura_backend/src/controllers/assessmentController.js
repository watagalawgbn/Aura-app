const { getShuffledQuestions } = require("../services/assessmentService");
const { calculateScores } = require("../services/scoringService");
const AssessmentResult = require("../models/AssessmentResult");

// GET /api/assessments
exports.getAssessmentQuestions = (req, res) => {
  try {
    const shuffledQuestions = getShuffledQuestions();
    res.json(shuffledQuestions);
  } catch (error) {
    console.error("Failed to load questions:", error);
    res.status(500).json({ error: "Failed to load assessment questions" });
  }
};

// POST /api/assessments/submit
exports.submitAssessment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: "Invalid answers format" });
    }

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
    console.error("Assessment submission error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
