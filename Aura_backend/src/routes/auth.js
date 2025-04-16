const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register route
router.post("/signup", async (req, res) => {
    console.log("Received Sign-Up request:", req.body);
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            console.log("User already exists:", email);
            return res.status(400).json({ msg: "User already exists" });
        }

        user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        console.log("User registered:", email);

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("Token generated:", token);
        res.json({ token });
    } catch (err) {
        console.error("Sign-Up Error:", err.message);
        res.status(500).send("Server error");
    }
});


// Login route
router.post("/signin", async (req, res) => {
    console.log("Received Sign-In request:", req.body);
    const { email, password } = req.body;
    console.log("Sign-In Request:", { email, password }); // Log incoming sign-in request

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found:", email); // Log if user not found
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid password for:", email); // Log invalid password attempt
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("Token generated:", token); // Log token generation
        res.json({ token });
    } catch (err) {
        console.error("Sign-In Error:", err.message); // Log error
        res.status(500).send("Server error");
    }
});

module.exports = router;
