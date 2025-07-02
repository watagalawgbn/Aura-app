//models/Sleep.js

const mongoose = require('mongoose');

const SleepSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    hours: { type: Number, required: true },
});

module.exports = mongoose.model('Sleep', SleepSchema);