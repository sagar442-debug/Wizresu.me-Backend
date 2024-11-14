const { Webhook } = require("svix");
const bodyParser = require("body-parser");
const { UserSave } = require("./controller/UserSave");
const { Deleteuser } = require("./controller/DeleteUser");

const clerkWebhookHandler = async (req, res) => {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("You need a WEBHOOK_SECRET in your .env");
  }

  // Get the headers and body
  const headers = req.headers;
  const payload = req.body;

  // Get the Svix headers for verification
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  // If there are no Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Attempt to verify the incoming webhook
  // If successful, the payload will be available from 'evt'
  // If the verification fails, error out and  return error code
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.log("Error verifying webhook:", err.message);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", evt.data);
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, first_name, last_name, image_url, email_addresses } = evt?.data;
    try {
      await UserSave({
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
      });

      return new Response("User is created or updated", {
        status: 200,
      });
    } catch (error) {
      console.log("Error creating or updating user", error);
      return new Response("Error occured", {
        status: 400,
      });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt?.data;
    try {
      await Deleteuser(id);
      return new Response("User is deleted", {
        status: 200,
      });
    } catch (error) {
      console.log("Error while deleting the user", error);
      return new Response("Error occured", {
        status: 400,
      });
    }
  }

  return res.status(200).json({
    success: true,
    message: "Webhook received",
  });
};

module.exports = clerkWebhookHandler;
