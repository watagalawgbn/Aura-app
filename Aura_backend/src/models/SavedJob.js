//user specific job model
const mongoose = require("mongoose");

const SavedJobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobRef:  { type: mongoose.Schema.Types.ObjectId, ref: "JobListing", required: true },
  status:  { type: String, enum: ["saved","applied"], default: "saved" },
  notes:   { type: String, default: "" }
}, { timestamps: true });

SavedJobSchema.index({ userId: 1, jobRef: 1 }, { unique: true }); // one row per user per job

module.exports = mongoose.models.SavedJob || mongoose.model("SavedJob", SavedJobSchema);
