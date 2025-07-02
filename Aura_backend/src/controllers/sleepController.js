//controllers/sleepController.js

const Sleep = require('../models/Sleep');

//get all sleep records
exports.getSleepData = async(req, res) => {
    try{
        const userId = req.user.id;
        const data = await Sleep.find({userId}).sort({date:1});
        res.json(data);
    }
    catch(err){
        res.status(500).json({message: 'Error fetching sleep data'});
        console.log("Error fetching sleep data!!!", err);
    }
};

//get all sleep data by date
exports.getSleepByDate = async(req, res) => {
    try{
        const userId = req.user.id;
        const { date } = req.params;
        const data = await Sleep.find({userId, date});
        if(!data) res.status(404).json({message: 'No data for this date!'});
        res.json(data);
    }
    catch(err){
        console.error("Error fetching sleep data by date", err);
        res.status(500).json({message: 'Error fetching sleep data by date'});
    }
}

//add or update sleep data
exports.postSleepData = async(req, res) => {
    try{
        const userId = req.user.id;
        const { date, hours } = req.body;

        if(! date || hours == null){
            return res.status(400).json({message: 'Date and hours are required'});
        }

        const existing = await Sleep.findOne({userId, date});

        if(existing){
            existing.hours = hours;
            await existing.save();
            res.json({message: 'Sleep data', data: existing});
        }else{
            const newSleepData = new Sleep({ userId, date, hours });
            await newSleepData.save();
            res.status(201).json({message: 'Slepp data saved', data: newSleepData });
        }
    }
    catch(err){
        console.error("Error saving data", err);
        res.status(500).json({messsage: 'Error saving data'});
    }
}