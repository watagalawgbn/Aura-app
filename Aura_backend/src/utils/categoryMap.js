//utils/categoryMap.js

const categoryMap = {
    PHQ: {
        Mild: ["relaxation", "mood"],
        Moderate: ["relaxation", "focus"],
        "Moderately Severe": ["relaxation", "sleep"],
        Severe: ["relaxation", "professional"],
    },
    GAD: {
        Mild: ["anxiety", "relaxation", "breathing"],
        Moderate: ["anxiety", "sleep", "breathing"],
        Severe: ["anxiety", "stress", "breathing"],
    },
    DASS: {
        Mild: ["stress", "relaxation", "breathing"],
        Moderate: ["stress", "focus", "breathing"],
        Severe: ["stress", "sleep", "breathing"],
        "Extremely Severe": ["stress", "professional"],
    }
};

module.exports = categoryMap;