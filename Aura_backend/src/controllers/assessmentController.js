const { getShuffledQuestions } = require("../services/assessmentService");
const { calculateScores } = require("../services/scoringService");
const AssessmentResult = require("../models/AssessmentResult");
const { getRecommendations } = require("../services/recommendationService");

//----------------GET ASSESSMENT QUESTIONS-----------------
exports.getAssessmentQuestions = (req, res) => {
  try {
    //fetch and shuffle questions from the service
    const shuffledQuestions = getShuffledQuestions();
    res.json(shuffledQuestions); //send questions as JSON
  } catch (error) {
    console.error("Failed to load questions:", error);
    res.status(500).json({ error: "Failed to load assessment questions" });
  }
};

//----------------SUBMIT ASSESSMENT-----------------
exports.submitAssessment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { answers } = req.body;

    if (!Array.isArray(answers)) { //validate input
      return res.status(400).json({ error: "Invalid answers format" });
    }

    const scores = calculateScores(answers); //calculate scores using the scoring service

    //save results to the database
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

    //get personalized recommendations
    const recommendations = await getRecommendations(scores);
    console.log("Recommendations:", recommendations);

    res.json({ message: "Assessment submitted successfully", scores, recommendations });
  } catch (error) {
    console.error("Assessment submission error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
