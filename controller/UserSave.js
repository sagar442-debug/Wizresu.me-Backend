const User = require("../models/User");

const UserSave = async (req, res) => {
  const { id, first_name, last_name, image_url, email_addresses } = req.body;
  const newUser = new User({
    clerkId: id,
    name: first_name + " " + last_name,
    email: email_addresses,
    avatar: image_url,
    subscription,
    resumes,
  });

  try {
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          name: first_name + " " + last_name,
          avatar: image_url,
          email: email_addresses[0].email,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
    res.statu(200).json({ message: "User saved successfully", user });
  } catch (error) {
    res.send("There was an error: ", error.message);
  }
};

module.exports = { UserSave };
