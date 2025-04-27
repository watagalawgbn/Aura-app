const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../data/assessment_questions.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Group by type or scale
    const grouped = {
        PHQ: [],
        GAD: [],
        DASS: [],
    };

    // Transform data to match frontend expectations while grouping
    data.forEach((q) => {
        // Create standardized question object
        let transformedQuestion = {
            id: q.id,
            question: q.question,
            options: []
        };
        
        // Handle GAD questions (already has 'type' field)
        if (q.type === 'GAD') {
            transformedQuestion.type = 'GAD';
            transformedQuestion.options = q.options.map(opt => ({
                label: opt.text,
                value: opt.score
            }));
            grouped.GAD.push(transformedQuestion);
        } 
        // Handle PHQ questions
        else if (q.scale === 'PHQ-9') {
            transformedQuestion.type = 'PHQ';
            transformedQuestion.options = q.options.map(score => ({
                label: q.labels[score.toString()],
                value: score
            }));
            grouped.PHQ.push(transformedQuestion);
        } 
        // Handle DASS questions
        else if (q.scale === 'DASS') {
            transformedQuestion.type = 'DASS';
            transformedQuestion.options = q.options.map(score => ({
                label: q.labels[score.toString()],
                value: score
            }));
            grouped.DASS.push(transformedQuestion);
        }
    });

    console.log("Grouped counts:", {
        PHQ: grouped.PHQ.length,
        GAD: grouped.GAD.length,
        DASS: grouped.DASS.length,
    });

    // Randomly select from each
    const getRandomValues = (arr, n) => {
        if (arr.length === 0 || n <= 0) return [];
        const count = Math.min(n, arr.length);
        return arr.sort(() => 0.5 - Math.random()).slice(0, count);
    };

    const selected = [
        ...getRandomValues(grouped.PHQ, 4),
        ...getRandomValues(grouped.GAD, 4),
        ...getRandomValues(grouped.DASS, 4),
    ];

    // Shuffle final mix
    const shuffled = selected.sort(() => 0.5 - Math.random());
    
    res.json(shuffled);
});

module.exports = router;