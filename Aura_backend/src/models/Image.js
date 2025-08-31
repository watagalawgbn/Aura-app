const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    filename: String,
    gridfsId: mongoose.Schema.Types.ObjectId, //id of the file in gridfs
    meditation: {type: mongoose.Schema.Types.ObjectId, ref: "Meditation"},
});

module.exports = mongoose.model("Image", ImageSchema);