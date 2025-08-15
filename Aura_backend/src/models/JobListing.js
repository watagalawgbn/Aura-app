//jobLIsting model avoid storing the same exeternal job 100 times
const mongoose = require("mongoose");

const JobListingSchema = new mongoose.Schema({
  jobId: { type: String, required: true, unique: true }, // JSearch job_id
  title: String,
  company: String,
  description: String,
  city: String,
  state: String,
  country: String,
  employmentType: String,
  postedAtUTC: String,
  applyLink: String,
  source: { type: String, default: "jsearch" } // who gave us this job
}, { timestamps: true });

// TTL: auto-delete after ~30 days (2592000s) to keep cache fresh
JobListingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });

module.exports = mongoose.models.JobListing || mongoose.model("JobListing", JobListingSchema);
