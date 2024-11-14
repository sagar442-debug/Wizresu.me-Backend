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
app.use(bodyParser.raw({ type: "application/json" }));
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;
connectDB();
app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);
app.post(
  "/api/webhooks",
  bodyParser.raw({ type: "application/json" }),
  clerkWebhookHandler
);

app.get("/", (req, res) =>
  res.json({ message: "The api is working for Wizresu.me backend" })
);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
