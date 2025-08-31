// routes/breathingSessionRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/breathingSessionController");
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.post("/", controller.saveSession);

module.exports = router;
