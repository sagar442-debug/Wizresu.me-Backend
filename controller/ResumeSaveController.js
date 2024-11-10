const resumeModel = require("../models/ResumeModel");

const saveResume = async (req, res) => {
  const {
    resumeTitle,
    jobTitle,
    jobDescription,
    userFullName,
    userEmailAddress,
    userPhoneNumber,
    userWebsite,
    userAddress,
    userDegree,
    userLanguage,
    jobExperience,
  } = req.body;
  try {
    const newResume = new resumeModel({
      resumeTitle,
      jobTitle,
      jobDescription,
      userFullName,
      userEmailAddress,
      userPhoneNumber,
      userWebsite,
      userAddress,
      userDegree,
      userLanguage,
      jobExperience,
    });

    await newResume.save();
    res.status(201).json({ message: "Resume saved successfully!" });
  } catch (error) {
    if ((error.name = "Validation Error")) {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ message: "Validation failed", errors });
    } else {
      res
        .status(500)
        .json({ message: "Error Saving the resume", error: error.message });
    }
  }
};

module.exports = saveResume;
