const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const generateToken = require("../utils/generateToken");

// const Project = require("../models/Project.model");
// const mongoose = require("mongoose");

/*
@desc Register User
@route POST /
@access Public
*/
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    skills,
    experience,
    preferredLocation,
    expectedSalary,
  } = req.body;

  //   checking if  email exist or not
  const userEmailCheck = await User.findOne({ email });
  if (userEmailCheck) {
    res.status(400);
    throw new Error("Email already exist");
  }
  // submit data
  const user = await User.create({
    name,
    email,
    password,
    skills,
    experience,
    preferredLocation,
    expectedSalary,
  });
  res.status(201).json({
    user: { _id: user._id, username: user.name },
  });
});

/*
@desc login User
@route POST /login
@access Public
*/
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //  checking email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid Email");
  }
  //  checking password
  if (!(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid Password");
  }
  // submit data
  delete user["_doc"].password;
  res.status(201).json({
    token: generateToken(user._id, user.username),
    ...user["_doc"],
  });
});

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
