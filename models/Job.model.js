const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    minexp: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    active: {
      type: String,
      default: true,
    },
    totalApplicant: {
      type: Number,
      default: 0,
    },
    applicant: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

jobSchema.pre("save", async function (next) {
  if (!this.isModified("applicant")) {
    next();
  }
  if (!(this.totalApplicant > 9)) {
    this.totalApplicant = this.applicant.length;
  } else {
    this.active = false;
  }
});
module.exports = mongoose.model("Job", jobSchema);
