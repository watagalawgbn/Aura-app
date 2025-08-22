//models/Sleep.js

const mongoose = require('mongoose');

const SleepSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    hours: { type: Number, required: true },
    startTime: { type: String, required: false },
    endTime: { type: String, required: false },
});

module.exports = mongoose.model('Sleep', SleepSchema);