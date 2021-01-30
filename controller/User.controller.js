const asyncHandler = require("express-async-handler");
const Job = require("../models/Job.model");
const mongoose = require("mongoose");

const applyJob = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { jobId } = req.params;
  const job = await Job.findById(jobId);
  const applied = job.applicant.includes(mongoose.Types.ObjectId(id));
  if (applied) {
    res.status(400);
    throw new Error("Already Applied");
  }
  if (job.totalApplicant !== 10) {
    job.applicant.push(id);
    await job.save();
    delete job["_doc"].applicant;
    delete job["_doc"].totalApplicant;
    res.status(200).json({ job });
  } else {
    res.status(400);
    throw new Error("Job not Active");
  }
});

module.exports.applyJob = applyJob;
