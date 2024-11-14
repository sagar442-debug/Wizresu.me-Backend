const resumeModel = require("../models/ResumeModel");
const User = require("../models/User");
const saveResume = async (req, res) => {
  const {
    userId,
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
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newResume = new resumeModel({
      userId,
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
    user.resumes.push(newResume._id);
    await user.save();
    res
      .status(201)
      .json({ message: "Resume saved successfully!", id: newResume._id });
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
