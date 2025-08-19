//controller/authController.js

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const resetPasswordTemplate = require("../templates/resetPasswordEmail");

//signup
exports.signup = async (req, res) => {
  console.log("Received Sign-Up request:", req.body);
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      console.log("User already exists:", email);
      return res.status(400).json({ msg: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();
    console.log("User registered:", email);

    const token = generateToken(user);
    // console.log("Token generated:", token);
    res.json({ token });
  } catch (error) {
    console.error("Sign-Up Error:", error.message);
    res.status(500).send("Server error");
  }
};

//signin
exports.signin = async (req, res) => {
  console.log("Received Sign-In request:", req.body);
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    console.log("User:", user);
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password for:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user);
    console.log("Token generated:", token);
    res.json({ token });
  } catch (error) {
    console.error("Sign-In Error:", error.message);
    res.status(500).send("Server error");
  }
};

//profile
exports.getMe = async (req, res) => {
  try {
    const { id, name, email } = req.user;
    res.json({ id, name, email });
  } catch (err) {
    console.error("Error in /me route:", err.message);
    res.status(500).send("server error");
  }
};

//forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 mins
  await user.save();

  const link = `exp://exp.host/@watagala/Aura_frontend/--(auth)/reset-password/${token}`;
  const html = resetPasswordTemplate(user.name, link);

  await sendEmail(
    user.email,
    "Reset Your Password - AURA.",
    `Click to reset your password: ${link}`,
    html
  );
  res.json({ msg: "Reset link sent to your email." });
};

//reset password
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ msg: "Invalid or expired token." });

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();
  res.json({ msg: "Password has been reset." });
};
