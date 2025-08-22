//routes/auth.js

const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

const { signup, signin, getMe } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");
const { forgotPassword, resetPassword } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", authenticateToken, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;
