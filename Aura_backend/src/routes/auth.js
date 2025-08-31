//routes/auth.js

const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

const { signup, signin, getMe } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", authenticateToken, getMe);

module.exports = router;
