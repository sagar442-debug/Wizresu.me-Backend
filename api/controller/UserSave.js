const User = require("../models/User");

const UserSave = async ({
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
}) => {
  try {
    // Check if the user already exists by clerkId
    let user = await User.findOne({ email: email_addresses[0].email_address });

    if (user) {
      // User exists, update the user record
      user.name = first_name + " " + last_name;
      user.avatar = image_url;
      user.email = email_addresses[0]?.email_address;

      // Save the updated user
      await user.save();
      console.log("User updated successfully", user);
    } else {
      // User doesn't exist, create a new user
      user = new User({
        clerkId: id,
        name: first_name + " " + last_name,
        avatar: image_url,
        email: email_addresses[0]?.email_address,
      });

      await user.save();
      console.log("User created successfully", user);
    }
  } catch (error) {
    console.error("Error saving user:", error.message);
    throw error; // Re-throw error for the webhook handler to catch
  }
};

module.exports = { UserSave };
