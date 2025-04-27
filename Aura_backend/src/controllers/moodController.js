//controllers/moodControllers.js

const Mood = require("../models/Mood");

exports.addMood = async(req, res) => {
    const { mood } = req.body;

    try{
        const newMood = new Mood({user: req.user.id, mood});
        await newMood.save();
        console.log("New mood saveddd: ", newMood);
        res.status(201).json(newMood);
    }catch(err){
        res.status(500).json({msg: "Failed to log mood!"});
    }
};

exports.getMoods = async(req, res) => {
    const { range } = req.query;// 'weeks', 'months'
    const end = new Date();
    let start;

    switch(range){
        case "week":
            start = new Date(end);
            start.setDate(start.getDate() -7 );
            break;
        case 'month':
            start = new Date(end);
            start.setMonth(start.getMonth() -1 );
            break;
        default:
            start = new Date(0);
    }

    try{
        console.log("User ID: ", req.user.id);
        console.log("Start Date: ", start);
        console.log("End Date: ", end);

        const moods = await Mood.find({
            user: req.user.id,
            timestamp: {$gte: start, $lte: end},
        }).sort("timestamp");

        console.log("Moods found: ", moods);
        res.json(moods);
    }catch(err){
        console.error("Error fetching moods:", err); 
        res.status(500).json({msg: "Failed to fetch moods!"});
    }
};