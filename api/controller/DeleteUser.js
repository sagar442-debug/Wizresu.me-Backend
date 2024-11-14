const User = require("../models/User");

const Deleteuser = async (req, res) => {
  const { id } = req.body;
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
    res.status(200).json({ message: "User deleted successfull" });
  } catch (error) {
    res.status(400).json({ message: "Deletion of user unsuccessful", error });
  }
};

module.exports = { Deleteuser };
