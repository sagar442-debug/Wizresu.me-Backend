const Resume = require("../models/ResumeModel");

const getResumeDetails = async (req, res) => {
  const { resumeId, clerkId } = req.query;
  const loggedInUserId = clerkId;
  try {
    const resume = await Resume.findOne({
      _id: resumeId,
      clerkId: loggedInUserId,
    });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found!!" });
    }

    return res
      .status(200)
      .json({ message: "Resume found!!", resumeDetails: resume });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return res.status(500).json({
      message: "Server error while fetching the resume.",
      error: error.message,
    });
  }
};

module.exports = getResumeDetails;
