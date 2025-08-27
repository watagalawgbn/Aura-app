// services/scoringService.js

//function to calculate severity level based on total score
const calculateSeverity = (type, totalScore) => {
    if (type === 'PHQ') {
        if (totalScore <= 4) return 'Minimal';
        if (totalScore <= 9) return 'Mild';
        if (totalScore <= 14) return 'Moderate';
        if (totalScore <= 19) return 'Moderately Severe';
        return 'Severe';
    }
    if (type === 'GAD') {
        if (totalScore <= 4) return 'Minimal';
        if (totalScore <= 9) return 'Mild';
        if (totalScore <= 14) return 'Moderate';
        return 'Severe';
    }
    if (type === 'DASS') {
        if (totalScore <= 9) return 'Normal';
        if (totalScore <= 13) return 'Mild';
        if (totalScore <= 20) return 'Moderate';
        if (totalScore <= 27) return 'Severe';
        return 'Extremely Severe';
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
    calculateScores
};
