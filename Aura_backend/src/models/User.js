//models/User.js

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date}
});

module.exports = mongoose.model("User", UserSchema);