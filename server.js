const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const clerkWebhookHandler = require("./clerkWebhookHandler");
const { Webhook } = require("svix");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);
app.post(
  "/api/webhooks",
  bodyParser.raw({ type: "application/json" }),
  clerkWebhookHandler
);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running on port 5000")
);
