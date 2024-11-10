const User = require("../models/User");

const UserSave = async (req, res) => {
  const { clerkId, name, email, subscription, resumes } = req.body;
  const newUser = new User({
    clerkId,
    name,
    email,
    subscription,
    resumes,
  });

  try {
    await newUser.save();
    res.send("User saved successfully");
  } catch (error) {
    res.send("There was an error: ", error.message);
  }
};

module.exports = { UserSave };
