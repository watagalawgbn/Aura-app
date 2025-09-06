const express = require("express");
const router = express.Router();
const { getRecommendations, saveJob, getSavedJobs, deleteSavedJob } = require("../controllers/jobController");

router.post("/recommendations", getRecommendations);
router.post("/save", saveJob);
router.get("/saved/:userId", getSavedJobs);
router.delete("/saved/:id", deleteSavedJob);


module.exports = router;