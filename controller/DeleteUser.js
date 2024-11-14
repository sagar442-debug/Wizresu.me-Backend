const User = require("../models/User");

const Deleteuser = async (req, res) => {
  const { id } = req.body;
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log("Error deleting the user", error);
  }
};

module.exports = { Deleteuser };
