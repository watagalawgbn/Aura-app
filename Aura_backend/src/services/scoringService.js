// services/scoringService.js

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

const calculateScores = (answers) => {
    const grouped = {
        PHQ: { questionIds: [], answers: [], totalScore: 0 },
        GAD: { questionIds: [], answers: [], totalScore: 0 },
        DASS: { questionIds: [], answers: [], totalScore: 0 },
    };

    answers.forEach((answer) => {
        const { id, type, answer: value } = answer;
        if (grouped[type]) {
            grouped[type].questionIds.push(id);
            grouped[type].answers.push(value);
            grouped[type].totalScore += value;
        }
    });

    // Now assign severity
    for (const type in grouped) {
        const group = grouped[type];
        group.severity = calculateSeverity(type, group.totalScore);
    }

    return grouped;
};

module.exports = {
    calculateScores
};
