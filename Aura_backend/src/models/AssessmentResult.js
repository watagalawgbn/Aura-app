//models/AssessmentResult.js

const mongoose = require('mongoose');

const AssessmentResultsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
    scores:{
        PHQ:{
            questionIds: [String],
            answers: [Number],
            totalScore: Number,
            severity: String
        },
        GAD:{
            questionIds: [String],
            answers:[Number],
            totalScore: Number,
            severity: String
        },
        DASS:{
            questionIds: [String],
            answers: [Number],
            totalScore: Number,
            severity: String
        }
    },
    rawResponses: [{
        questionIds: String,
        questionType: String,
        answer: Number
    }]
},{
    timestamps: true
});

module.exports = mongoose.model('AssessmentResults', AssessmentResultsSchema);