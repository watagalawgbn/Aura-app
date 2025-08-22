//routes/meditationRoutes.js

const express = require("express");
const { getAllMeditations } = require("../controllers/meditationController");

const router = express.Router();

router.get("/", getAllMeditations);

module.exports = router;
