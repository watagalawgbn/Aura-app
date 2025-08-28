//utils/categoryMap.js

const categoryMap = {
    PHQ: {
        Mild: ["relaxation", "mood"],
        Moderate: ["relaxation", "focus"],
        "Moderately Severe": ["relaxation", "sleep"],
        Severe: ["relaxation", "professional"],
    },
    GAD: {
        Mild: ["anxiety", "relaxation"],
        Moderate: ["anxiety", "sleep"],
        Severe: ["anxiety", "stress"],
    },
    DASS: {
        Mild: ["stress", "relaxation"],
        Moderate: ["stress", "focus"],
        Severe: ["stress", "sleep"],
        "Extremely Severe": ["stress", "professional"],
    }
};

module.exports = categoryMap;