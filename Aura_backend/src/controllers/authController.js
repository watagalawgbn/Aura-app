const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

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
    console.log("Token generated:", token);
    res.json({ token });
  } catch (error) {
    console.error("Sign-Up Error:", err.message);
    res.status(500).send("Server error");
  }
};

exports.signin = async (req, res) => {
  console.log("Received Sign-In request:", req.body);
  const { email, password } = req.body;
  console.log("Sign-In Request:", { email, password });
  try {
    let user = await User.findOne({ email });

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
    console.error("Sign-In Error:", err.message);
    res.status(500).send("Server error");
  }
};

exports.getMe = async (req, res) => {
  try {
    const { id, name, email } = req.user;
    res.json({ id, name, email });
  } catch (err) {
    console.error("Error in /me route:", err.message);
    res.status(500).send("server error");
  }
};
