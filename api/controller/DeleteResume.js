const User = require("../models/User");
const Resume = require("../models/ResumeModel");

const DeleteResume = async (req, res) => {
  const { resumeId, clerkId } = req.body;

  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: "Error finding the user" });
    }
    const deletedResume = await Resume.findOneAndDelete({ _id: resumeId });
    if (!deletedResume) {
      return res.status(404).json({ message: "Couldn't access the resume" });
    }
  } catch (error) {}
};

module.exports = DeleteResume;
