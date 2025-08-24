//utils/workloadRules.js

function getMaxWorkLoad (hours){
    if(hours < 3) return 75; // 3 tasks max
    if(hours < 6) return 125; // 5 tasks
    if(hours < 8) return 200; // 8 tasks
    return 300; // 12 tasks
}

module.exports = { getMaxWorkLoad };