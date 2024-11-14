const User = require("../models/User");

const Deleteuser = async (id) => {
  try {
    await User.findOneAndDelete({ clerkId: id });
    console.log("User deleted successfully");
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, message: "Deletion of user unsuccessful", error };
  }
};

module.exports = { Deleteuser };
