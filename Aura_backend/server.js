require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");

const auth = require("./src/routes/auth");
const assessmentRoutes = require('./src/routes/assessmentRoutes');
const moods = require("./src/routes/mood");


const app = express();
connectDB();
app.use(cors({ origin: '*' }));

// Middleware to parse JSON body
app.use(express.json());

// Route for authentication
app.use("/api/auth", auth);

//route for mood
app.use("/api/moods", moods);

//route for assessments
app.use("/api/assessment/questions", assessmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

