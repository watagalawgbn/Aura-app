const express = required("express");
const bcrypt = required("bcryptjs");
const jwt = required("jsonwebtoken");
const User =  require("../models/User");
const router = express.Router();

//register
router.post("/signup", async(req, res) => {
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user) return res.status(400).json({msg: "User already exists"});

        user = new User({ email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({token});
    }
    catch(err){
    res.status(500).send("Server error");
    }
});


//login
router.post("/signin", async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) 
            return res.status(400).json({msg: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({msg: "Invalid credentials"});

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({token});
    }
    catch(err){
        res.status(500).send("Server error");
    }
});

module.exports = router;