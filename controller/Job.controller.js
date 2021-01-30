const asyncHandler = require("express-async-handler");
const Job = require("../models/Job.model");

/*
@desc Registerv JOb
@route POST /
@access Public
*/
const addJob = asyncHandler(async (req, res) => {
  const { name, minexp, location, company, salary, skills } = req.body;

  // submit data
  const job = await Job.create({
    name,
    minexp,
    location,
    company,
    salary,
    skills,
  });
  res.status(201).json({
    job,
  });
});
const activeJob = asyncHandler(async (req, res) => {
  // submit data
  const job = await Job.find({ active: true });
  res.status(201).json({
    job,
  });
});
module.exports.addJob = addJob;
module.exports.activeJob = activeJob;
