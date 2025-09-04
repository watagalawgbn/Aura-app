// services/scoringService.js

///PHQ - Patient Health Questionnaire for Depression
///GAD - Generalized Anxiety Disorder
///DASS - Depression Anxiety Stress Scales

//function to calculate severity level based on total score
const calculateSeverity = (type, totalScore) => {
  if (type === "PHQ") {
    if (totalScore <= 1) return "Minimal"; // ~0–4
    if (totalScore <= 4) return "Mild"; // ~5–9
    if (totalScore <= 6) return "Moderate"; // ~10–14
    if (totalScore <= 9) return "Moderately Severe"; // ~15–19
    return "Severe"; // ~20–27
  }

  if (type === "GAD") {
    if (totalScore <= 2) return "Minimal"; // ~0–4
    if (totalScore <= 5) return "Mild"; // ~5–9
    if (totalScore <= 8) return "Moderate"; // ~10–14
    return "Severe"; // ~15–21
  }

  if (type === "DASS") {
    if (totalScore <= 3) return "Normal"; // ~0–9
    if (totalScore <= 4) return "Mild"; // ~10–13
    if (totalScore <= 6) return "Moderate"; // ~14–20
    if (totalScore <= 8) return "Severe"; // ~21–27
    return "Extremely Severe"; // ~28–42
  }
};

//function to calculate scores for each assessment type
const calculateScores = (answers) => {
  //group answers by type
  const grouped = {
    PHQ: { questionIds: [], answers: [], totalScore: 0 },
    GAD: { questionIds: [], answers: [], totalScore: 0 },
    DASS: { questionIds: [], answers: [], totalScore: 0 },
  };

  //loop through all answers and put them in the right group
  answers.forEach((answer) => {
    const { id, type, answer: value } = answer;
    if (grouped[type]) {
      grouped[type].questionIds.push(id); //store question id
      grouped[type].answers.push(value); //store raw answer
      grouped[type].totalScore += value; //add to total score
    }
  });

  // after calculating totals, assign severity for each group
  for (const type in grouped) {
    const group = grouped[type];
    group.severity = calculateSeverity(type, group.totalScore);
  }

  return grouped; //return results for all assessments
};

module.exports = {
  calculateScores,
};
