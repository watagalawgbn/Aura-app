//routes/imageRoutes.js

const express = require("express");
const { streamImageById } = require("../controllers/imageController");

const router = express.Router();

router.get("/:imageId", streamImageById);

module.exports = router;
