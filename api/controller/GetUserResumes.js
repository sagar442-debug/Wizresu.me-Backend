const User = require("../models/User");

const getUserDetails = async (req, res) => {
  const { clerkId } = req.query;
  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ mesasge: "User not found" });
    }

    res.status(200).json({ message: "User found", userData: user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching the user data" });
  }
};

module.exports = getUserDetails;
