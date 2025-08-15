const { searchJobs } = require("../services/jsearchService");
const Job = require("../models/Job");
const JobListing = require("../models/JobListing");

function buildQuery({ skills = [], employementType = "", city = "" }) {
  const cleaned = (Array.isArray(skills) ? skills : [])
    .map(String)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 5);
  const skillsPart = cleaned.length ? cleaned.join(" OR ") : "";
  return [employementType || "", skillsPart, city || "", "jobs"]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

exports.getRecommendations = async (req, res) => {
  try {
    const {
      skills,
      employementType = "",
      city = "",
      country = "",
      date_posted = "all",
      page = 1,
      num_pages = 1,
    } = req.body || {};

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res
        .status(400)
        .json({ error: "Please send a non-empty 'skills' array" });
    }
    const query = buildQuery({ skills, employementType, city });
    const jobs = await searchJobs({
      query,
      country,
      date_posted,
      page,
      num_pages,
    });
    const results = jobs.map((j) => ({
      id: j.job_id,
      title: j.job_title,
      company: j.employer_name,
      location:
        j.jobCity && j.job_state && j.job_country
          ? `${j.job_city}, ${j.job_state}, ${j.job_country}`
          : j.job_city || j.job_state || j.job_country | "",
      tyep: j.job_employement_type || null,
      postedAt: j.job_posted_at_datetime_utc || j.job_posted_at || null,
      applyLink:
        j.job_apply_link ||
        j.job_applu_url ||
        j?.job_apply_options?.[0]?.applyLink ||
        null,
      descriptionSnippet: j.job_description
        ? j.job_description.slice(0, 220) + "..."
        : null,
    }));

    res.json({ query, count: results.length, results });
  } catch (e) {
    console.log("Error: ", e);
    res.status(e?.response?.status || 500).json({
      error: "Failed to fetch jobs.",
      details: e?.response?.data || e.message,
    });
  }
};

// expects body: { userId, job: { id,title,company,location,type,postedAt,applyLink,descriptionSnippet? } }
exports.saveJob = async (req, res) => {
  try {
    const { userId, job } = req.body || {};
    if (!userId || !job || !job.id) {
      return res
        .status(400)
        .json({ error: "userId and job {id,...} are required." });
    }

    // 1) normalize location
    let city = "",
      state = "",
      country = "";
    if (job.location) {
      const parts = String(job.location)
        .split(",")
        .map((s) => s.trim());
      [city, state, country] = [parts[0] || "", parts[1] || "", parts[2] || ""];
    }

    // 2) upsert the cached listing
    const listing = await JobListing.findOneAndUpdate(
      { jobId: job.id },
      {
        jobId: job.id,
        title: job.title || "",
        company: job.company || "",
        description: job.description || job.descriptionSnippet || "",
        city,
        state,
        country,
        employmentType: job.type || "",
        postedAtUTC: job.postedAt || "",
        applyLink: job.applyLink || "",
        source: "jsearch",
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // 3) create the user → job link (idempotent)
    const saved = await SavedJob.findOneAndUpdate(
      { userId, jobRef: listing._id },
      { userId, jobRef: listing._id },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(saved);
  } catch (e) {
    res.status(500).json({ error: "Could not save job.", details: e.message });
  }
};

exports.getSavedJobs = async (req, res) => {
  try {
    const { userId } = req.params;
    const list = await Job.find({ userId }).sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res
      .status(500)
      .json({ error: "Could not load saved job.", details: e.message });
  }
};

exports.deleteSavedJob = async (req, res) => {
  try {
    const { id } = req.params; // SavedJob _id
    await Job.findByIdAndDelete(id);
    res.json({ ok: true });
  } catch (e) {
    res
      .status(500)
      .json({ error: "Could not delete saved job.", details: e.message });
  }
};
