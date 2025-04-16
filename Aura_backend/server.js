const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/auth", reuqire("./routes/auth"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));