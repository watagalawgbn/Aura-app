//services/assessmentService.js

const fs = require('fs');
const path = require('path');

// load and group the assessment questions
const getAssessmentQuestions = () => {
    const filePath = path.join(__dirname, '../data/assessment_questions.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8')); //read questions from JSON file

    const grouped = {
        PHQ: [],
        GAD: [],
        DASS: [],
    };

    // transform each question into the right group
    data.forEach((q) => {
        let transformedQuestion = {
            id: q.id,
            question: q.question,
            options: [],
        };

        if (q.type === 'GAD') {
            transformedQuestion.type = 'GAD';
            transformedQuestion.options = q.options.map(opt => ({
                label: opt.text, //answer text
                value: opt.score, //numerical score
            }));
            grouped.GAD.push(transformedQuestion);
        } else if (q.scale === 'PHQ-9') {
            transformedQuestion.type = 'PHQ';
            transformedQuestion.options = q.options.map(score => ({
                label: q.labels[score.toString()], //label from JSON
                value: score, //numerical score
            }));
            grouped.PHQ.push(transformedQuestion);
        } else if (q.scale === 'DASS') {
            transformedQuestion.type = 'DASS';
            transformedQuestion.options = q.options.map(score => ({
                label: q.labels[score.toString()], //label from JSON
                value: score, //numerical score
            }));
            grouped.DASS.push(transformedQuestion);
        }
    });

    return grouped;
};

// get random values from an array
const getRandomValues = (arr, n) => {
    if (arr.length === 0 || n <= 0) return [];
    const count = Math.min(n, arr.length);
    return arr.sort(() => 0.5 - Math.random()).slice(0, count);
};

// get 4 random questions from each group and shuffle them
const getShuffledQuestions = () => {
    const grouped = getAssessmentQuestions();

    const selected = [
        ...getRandomValues(grouped.PHQ, 4), //pick 4 PHQ
        ...getRandomValues(grouped.GAD, 4), //pick 4 GAD
        ...getRandomValues(grouped.DASS, 4), //pick 4 DASS
    ];

    return selected.sort(() => 0.5 - Math.random()); //shuffle all selected questions
};

module.exports = {
    getShuffledQuestions,
};
