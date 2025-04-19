//config/db.js

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB..."); // Log the attempt
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully!"); // Log success
    } catch (err) {
        console.error("MongoDB connection error:", err.message); // Log error
        process.exit(1); // Exit the app if DB connection fails
    }
};

module.exports = connectDB;
