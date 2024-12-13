const User = require("../models/User");

const IncreaseQuickBuild = async (req, res) => {
  const { clerkId } = req.body;
  try {
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.subscription === "Basic" || parseInt(user.quickBuilds) >= 5) {
      return res.status(403).json({
        message:
          "Upgrade to a Premium subscription to use more than 5 quick builds.",
      });
    }

    const currentQuickBuilds = parseInt(user.quickBuilds) || 0;
    const updatedQuickBuilds = currentQuickBuilds + 1;
    user.totalResumeBuilds = updatedQuickBuilds.toString();
    await user.save();
    return res.status(200).json({
      message: "Quick build count updated successfully.",
      totalQuickBuilds: updatedQuickBuilds,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating the quick build count.",
    });
  }
};

module.exports = { IncreaseQuickBuild };
