const mongoose = require("mongoose");
const User = require("./User");

const resumeSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    resumeTitle: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    userFullName: {
      type: String,
      required: true,
    },
    objective: {
      type: String,
      require: true,
    },
    userEmailAddress: {
      type: String,
      required: true,
    },
    userPhoneNumber: {
      type: String,
      required: true,
    },
    userWebsite: {
      type: String,
      required: false,
    },
    userAddress: {
      type: String,
      required: false,
    },
    userDegree: {
      type: Array,
      required: false,
    },
    userLanguage: {
      type: Array,
      required: true,
    },
    jobExperience: {
      type: Array,
      required: true,
    },
    skills: {
      type: Array,
      required: true,
    },
    imageName: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
