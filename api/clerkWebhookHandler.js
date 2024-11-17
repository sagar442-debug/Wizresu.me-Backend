const { Webhook } = require("svix");
const { UserSave } = require("./controller/UserSave");
const { Deleteuser } = require("./controller/DeleteUser");

const clerkWebhookHandler = async (req, res) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ message: "WEBHOOK_SECRET is missing" });
  }

  const headers = req.headers;
  const payload = req.body;

  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ message: "Missing Svix headers" });
  }

  const webhook = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = webhook.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.log("Error verifying webhook:", err.message);
    return res
      .status(400)
      .json({ message: "Webhook verification failed", error: err.message });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID: ${id}, Event type: ${eventType}`);

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, first_name, last_name, image_url, email_addresses } = evt?.data;

    try {
      // Log the incoming data to verify that it's coming through correctly
      console.log("User data:", {
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
      });

      // Proceed with saving or updating the user
      const userSaved = await UserSave({
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
      });

      if (userSaved) {
        console.log(`User ${id} saved or updated successfully.`);
        return res
          .status(200)
          .json({ message: "User created or updated successfully" });
      } else {
        console.error(`Failed to save or update user ${id}`);
        return res
          .status(400)
          .json({ message: "Failed to save or update user" });
      }
    } catch (error) {
      console.log("Error creating or updating user", error);
      return res
        .status(400)
        .json({ message: "Error while creating or updating user", error });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt?.data;
    try {
      await Deleteuser(id);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.log("Error while deleting user", error);
      return res
        .status(400)
        .json({ message: "Error while deleting user", error });
    }
  }

  return res.status(200).json({
    success: true,
    message: "Webhook received and processed successfully",
  });
};

module.exports = clerkWebhookHandler;
