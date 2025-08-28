//services/recommendationService.js

const Meditation = require("../models/Meditation");
const BreathingSession = require("../models/BreathingSession");
const categoryMap =  require("../utils/categoryMap");

exports.getRecommendations = async(scores) => {
    let categories = [];

    //collect categories for each assessment severity
    if(scores.PHQ?.severity && categoryMap.PHQ[scores.PHQ.severity]){
        categories.push(...(categoryMap.PHQ[scores.PHQ.severity] || []));
    }
    if(scores.GAD?.severity && categoryMap.GAD[scores.GAD.severity]){
        categories.push(...(categoryMap.GAD[scores.GAD.severity] || []));
    }
    if(scores.DASS?.severity && categoryMap.DASS[scores.DASS.severity]){
        categories.push(...(categoryMap.DASS[scores.DASS.severity] || []));
    }

    //remove duplicates
    categories = [...new Set(categories)];

    //fetch breathing sessions matching any of the categories
    const includeBreathings = categories.includes("stress") || categories.includes("anxiety");

    //query meditations matching any of the categories
    const meditations = await Meditation.find({ categories: { $in: categories }}).limit(5);
    console.log("Fetched Recommendations:", meditations);

    return {meditations, breathings: includeBreathings? [{title: "Breathing Exercise", duration:300}]: []};
}