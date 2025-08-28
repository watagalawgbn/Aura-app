//services/recommendationService.js

const Meditation = require("../models/Meditation");
const categoryMap =  require("../utils/categoryMap");

exports.getRecommendations = async(req, res) => {
    let categories = [];

    //collect categories for each assessment severity
    if(scores.PHQ){
        categories.push(...(categoryMap.PHQ[scores.PHQ.severity] || []));
    }
    if(scores.GAD){
        categories.push(...(categoryMap.GAD[scores.GAD.severity] || []));
    }
    if(scores.DASS){
        categories.push(...(categoryMap.DASS[scores.DASS.severity] || []));
    }

    //remove duplicates
    categories = [...new Set(categories)];

    //query meditations matching any of the categories
    const recs = await Meditation.find({ categories: { $in: categories }}).limit(5);
    return recs;
}