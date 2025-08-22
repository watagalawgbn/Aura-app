const express = require("express");
const router = express.Router();
const { getRecommendations, saveJob, getSavedJobs } = require("../controllers/jobController");

router.post("/recommendations", getRecommendations);
router.post("/save", saveJob);
router.get("/saved/:userId", getSavedJobs);

module.exports = router;