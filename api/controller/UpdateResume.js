const User = require("../models/User");
const Resume = require("../models/ResumeModel");

const UpdateResume = async (req, res) => {
  const {
    clerkId,
    resumeId,
    objective,
    skills,
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
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resume = await Resume.findOne({ _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "No resume found" });
    }

    if (objective) resume.objective = objective;
    if (skills) resume.skills = skills;
    if (resumeTitle) resume.resumeTitle = resumeTitle;
    if (jobTitle) resume.jobTitle = jobTitle;
    if (jobDescription) resume.jobDescription = jobDescription;
    if (userFullName) resume.userFullName = userFullName;
    if (userEmailAddress) resume.userEmailAddress = userEmailAddress;
    if (userPhoneNumber) resume.userPhoneNumber = userPhoneNumber;
    if (userWebsite) resume.userWebsite = userWebsite;
    if (userAddress) resume.userAddress = userAddress;
    if (userDegree) resume.userDegree = userDegree;
    if (userLanguage) resume.userLanguage = userLanguage;
    if (jobExperience) resume.jobExperience = jobExperience;

    const updatedResume = await resume.save();

    res
      .status(200)
      .json({ message: "Updated the resume!!", resume: updatedResume });
  } catch (error) {
    console.error("Error updating the resume", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = UpdateResume;
