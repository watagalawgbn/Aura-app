//routes/audioRoutes.js

const express = require("express");
const { streamAudioByFilename } = require("../controllers/audioController");

const router = express.Router();

router.get("/:filename", streamAudioByFilename);

module.exports = router;
