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

app.use(express.json());

app.use("/api/auth", auth);

app.use("/api/moods", moods);

app.use("/api/assessment", assessmentRoutes);

const breathingSessionRoutes = require("./src/routes/breathingSessionRoutes");
app.use("/api/breathing-sessions", breathingSessionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

