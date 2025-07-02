//routes/sleepRoutes.js

const express = require("express");
const router = express.Router();
const sleepController = require("../controllers/sleepController");
const authenticateToken = require("../middleware/authMiddleware");

router.use(authenticateToken);

router.get('/', sleepController.getSleepData);
router.get('/:date', sleepController.getSleepByDate);
router.post('/', sleepController.postSleepData);

module.exports = router;