// routes/breathingSessionRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/breathingSessionController");

router.post("/", controller.saveSession);

module.exports = router;
