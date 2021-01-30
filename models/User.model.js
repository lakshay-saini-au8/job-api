const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    default:
      "https://secure.gravatar.com/avatar/5b95ac6704ff2eb57611b084746b2a03?s=800&d=identicon",
  },
  resumeLink: {
    type: String,
    default:
      "https://secure.gravatar.com/avatar/5b95ac6704ff2eb57611b084746b2a03?s=800&d=identicon",
  },
  skills: {
    type: [String],
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  preferredLocation: {
    type: [String],
    required: true,
  },
  expectedSalary: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  } catch (error) {
    throw new Error(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};
userSchema.path("preferredLocation").validate(function (value) {
  if (value.length >= 2) {
    throw new Error("You can choose only one Preferred Location");
  }
});
module.exports = mongoose.model("User", userSchema);
