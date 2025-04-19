//routes/auth.js

const express = require("express");
const { signup, signin, getMe } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");
const { model } = require("mongoose");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", authenticateToken, getMe);

module.exports = router;
