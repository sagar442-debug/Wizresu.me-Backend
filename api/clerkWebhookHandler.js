const { Webhook } = require("svix");
const { UserSave } = require("./controller/UserSave");
const { Deleteuser } = require("./controller/DeleteUser");

const clerkWebhookHandler = async (req, res) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ message: "WEBHOOK_SECRET is missing" });
  }

  const headers = req.headers;
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return void res.status(400).json({
      success: false,
      message: "Error: Missing svix headers",
    });
  }

  const payload = req.body; // Convert Buffer to string
  const webhook = new Webhook(WEBHOOK_SECRET);

  let evt;

  try {
    evt = webhook.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.log("Error: Could not verify webhook:", err.message);
    return void res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, first_name, last_name, email_addresses, image_url } = evt.data;

    try {
      await UserSave({
        id,
        first_name,
        last_name,
        email_addresses,
        image_url,
      });
      return res
        .status(200)
        .json({ message: "User created or updated successfully" });
    } catch (err) {
      console.error("Error saving/updating user:", err);
      return res
        .status(500)
        .json({ message: "Error saving/updating user", error: err.message });
    }
  }

  if (eventType === "user.deleted") {
    try {
      await Deleteuser(evt.data.id);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.error("Error deleting user:", err);
      return res
        .status(500)
        .json({ message: "Error deleting user", error: err.message });
    }
  }

  return res.status(200).json({ message: "Webhook processed successfully" });
};

module.exports = clerkWebhookHandler;
