const resumeModel = require("../models/ResumeModel");
const User = require("../models/User");

const saveResume = async (req, res) => {
  const {
    clerkId,
    resumeTitle,
    objective,
    skills,
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
    // Check if the user exists
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.subscription == "Basic" && user.resumes.length >= 1) {
      return res.status(403).json({
        message:
          "Upgrade to a Premium Subscription to save more than one resume.",
      });
    }

    const newResume = new resumeModel({
      clerkId,
      resumeTitle,
      objective,
      skills,
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

    // Save the resume
    await newResume.save();

    // Add the resume ID to the user's resumes array
    user.resumes.push(newResume._id);
    // const updatedResumeBuilds = parseInt(user.totalResumeBuilds) + 1;
    // user.totalResumeBuilds = updatedResumeBuilds.toString();
    await user.save();

    // Respond with success
    res
      .status(201)
      .json({ message: "Resume saved successfully!", id: newResume._id });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors properly
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ message: "Validation failed", errors });
    } else {
      res
        .status(500)
        .json({ message: "Error saving the resume", error: error.message });
    }
  }
};

module.exports = saveResume;
