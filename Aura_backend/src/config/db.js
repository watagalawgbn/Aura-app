//config/db.js

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        console.log("Mongodb uri: ", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log("MongoDB connected successfully!"); 
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
