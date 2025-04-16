const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

// Enable CORS
app.use(cors({ origin: '*' }));

// Middleware to parse JSON body
app.use(express.json());

// Route for authentication
app.use("/api/auth", require("./src/routes/auth"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

