const { searchJobs } = require("../services/jsearchService");
const SavedJob = require("../models/SavedJob");
const JobListing = require("../models/JobListing");


//Build a short search string for JSearch using skills + employmentType + city
function buildQuery({ skills = [], employmentType = "", city = "" }) {
  const cleaned = (Array.isArray(skills) ? skills : []) // ensure it's an array
    .map(String) // coerce everything to string
    .map((s) => s.trim()) //remove extra spaces
    .filter(Boolean) //drop empty items
    .slice(0, 5);  //cap at 5 skills so query stays short

  const skillsPart = cleaned.length ? cleaned.join(" OR ") : "";

  return [employmentType || "", skillsPart, city || "", "jobs"] //stack parts: type + skills + city + word "jobs"
    .filter(Boolean) //remove blanks
    .join(" ") // combine into one string
    .replace(/\s+/g, " ") // normalize any weird spacing
    .trim(); //final clean
}

exports.getRecommendations = async (req, res) => {
  try {
    const {
      skills, //["mobile app development", "web app development"],
      employmentType = "", // part time, full time
      city = "",
      country = "",
      date_posted = "all", // "today" | "3days" | "week" | "month" | "all"
      page = 2, //JSearch page index(1 based)
      num_pages = 1, //JSearch returns ~10 results per page; 1 page ≈ 10 results
      remote = false, // when true → adds remote filter (remote_jobs_only)
    } = req.body || {};

    //validate: skills must exists & not be empty
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res
        .status(400)
        .json({ error: "Please send a non-empty 'skills' array" });
    }

    // Turn inputs into a compact JSearch query string
    const query = buildQuery({ skills, employmentType, city });
    // empty country - broden results such as remote anywhere
    const apiParams = { query, country, date_posted, page, num_pages };
    //return jobs the API marks as remote
    if (remote) apiParams.remote_jobs_only = true;
    //call the service -axios - jsearch
    const jobs = await searchJobs(apiParams);

    // Normalize each job into a clean, frontend-friendly shape
    const results = jobs.map((j) => {
      // Prefer structured city/state/country; fall back to any location string available.
      const loc =
        j.job_city && j.job_state && j.job_country
          ? `${j.job_city}, ${j.job_state}, ${j.job_country}`
          : j.job_location || j.job_city || j.job_state || j.job_country || "";

      // jsearch's boolean when present, if it falls detect common remote hints
      const remoteFlag =
        (typeof j.job_is_remote === "boolean" && j.job_is_remote) ||
        /(^|\b)(remote|work\s*from\s*home|wfh)\b/i.test(String(loc));

      return {
        id: j.job_id,
        title: j.job_title,
        company: j.employer_name,
        location: loc,
        type: j.job_employment_type_text || j.job_employment_type || null,
        postedAt: j.job_posted_at_datetime_utc || j.job_posted_at || null,
        applyLink:
          j.job_apply_link ||
          j.job_apply_url ||
          j?.apply_options?.[0]?.apply_link ||
          j?.job_apply_options?.[0]?.apply_link ||
          null,
        description: j.job_description || "",
        descriptionSnippet: j.job_description
          ? j.job_description.slice(0, 220) + "..."
          : null,
        remote: !!remoteFlag, // boolean preview for "Remote" badge in UI
      };
    });

    //result.length will be up to 10 when num_pages is 1
    res.json({ query, count: results.length, remoteApplied: !!remote, results });
  } catch (e) {
    console.log("Error: ", e);
    res.status(e?.response?.status || 500).json({
      error: "Failed to fetch jobs.",
      details: e?.response?.data || e.message,
    });
  }
};

// Save a job a user liked/applied (idempotent link to cached listing)
exports.saveJob = async (req, res) => {
  try {
    const { userId, job } = req.body || {}; // expect user id and job
    if (!userId || !job || !job.id) { //validate inputs
      return res
        .status(400)
        .json({ error: "userId and job {id,...} are required." });
    }

    // 1) splits  "City, State, Country" into separate fields
    let city = "",
      state = "",
      country = "";
    if (job.location) {
      const parts = String(job.location)
        .split(",")
        .map((s) => s.trim());
      [city, state, country] = [parts[0] || "", parts[1] || "", parts[2] || ""];
    }

    // 2) Upsert a cached JobListing (if it exists, update; otherwise create)
    const listing = await JobListing.findOneAndUpdate(
      { jobId: job.id }, // find by external job id
      {
        jobId: job.id, // copy over key fields for later display
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
      { new: true, upsert: true, setDefaultsOnInsert: true } // return the new/updated doc
    );

    // 3) create or keep the user listing link in savedJob
    const saved = await SavedJob.findOneAndUpdate(
      { userId, jobRef: listing._id },  // unique by user + job listing
      { userId, jobRef: listing._id },  // no extra payload yet (status/notes later)
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    console.log("Job saved", saved._id);
    res.status(201).json(saved); // return the link doc
  } catch (e) {
    console.error("Error saving jobs", e);
    res.status(500).json({ error: "Could not save job.", details: e.message });
  }
};

exports.getSavedJobs = async (req, res) => {
  try {
    const { userId } = req.params;
    const list = await SavedJob.find({ userId })
      .populate("jobRef") // pull in the cached JobListing fields
      .sort({ createdAt: -1 }); //newest first
    
    console.log("Saved jobs: ", list);
    res.json(list); // send the saved list back
  } catch (e) {
    console.error("Couldn't get saved jobs", e);
    res.status(500).json({ error: "Could not load saved job.", details: e.message });
  }
};

exports.deleteSavedJob = async (req, res) => {
  try {
    const { id } = req.params; // SavedJob _id
    await SavedJob.findByIdAndDelete(id);
    res.json({ ok: true });
  } catch (e) {
    res
      .status(500)
      .json({ error: "Could not delete saved job.", details: e.message });
  }
};
