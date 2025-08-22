//services/assessmentService.js

const fs = require('fs');
const path = require('path');

// Helper function to load and process the assessment questions
const getAssessmentQuestions = () => {
    const filePath = path.join(__dirname, '../data/assessment_questions.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const grouped = {
        PHQ: [],
        GAD: [],
        DASS: [],
    };

    // Process the questions into the appropriate groups
    data.forEach((q) => {
        let transformedQuestion = {
            id: q.id,
            question: q.question,
            options: [],
        };

        if (q.type === 'GAD') {
            transformedQuestion.type = 'GAD';
            transformedQuestion.options = q.options.map(opt => ({
                label: opt.text,
                value: opt.score,
            }));
            grouped.GAD.push(transformedQuestion);
        } else if (q.scale === 'PHQ-9') {
            transformedQuestion.type = 'PHQ';
            transformedQuestion.options = q.options.map(score => ({
                label: q.labels[score.toString()],
                value: score,
            }));
            grouped.PHQ.push(transformedQuestion);
        } else if (q.scale === 'DASS') {
            transformedQuestion.type = 'DASS';
            transformedQuestion.options = q.options.map(score => ({
                label: q.labels[score.toString()],
                value: score,
            }));
            grouped.DASS.push(transformedQuestion);
        }
    });

    return grouped;
};

// Helper function to get random values from an array
const getRandomValues = (arr, n) => {
    if (arr.length === 0 || n <= 0) return [];
    const count = Math.min(n, arr.length);
    return arr.sort(() => 0.5 - Math.random()).slice(0, count);
};

// Function to get shuffled random questions
const getShuffledQuestions = () => {
    const grouped = getAssessmentQuestions();

    const selected = [
        ...getRandomValues(grouped.PHQ, 4),
        ...getRandomValues(grouped.GAD, 4),
        ...getRandomValues(grouped.DASS, 4),
    ];

    return selected.sort(() => 0.5 - Math.random());
};

module.exports = {
    getShuffledQuestions,
};
