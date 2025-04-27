require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");

const assessmentRoutes = require('./src/routes/assessmentRoutes');

const app = express();
connectDB();
app.use(cors({ origin: '*' }));

// Middleware to parse JSON body
app.use(express.json());

// Route for authentication
app.use("/api/auth", require("./src/routes/auth"));

//route for mood
app.use("/api/moods", require("./src/routes/mood"));

//route for assessments
app.use("/api/assessment/questions", assessmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

