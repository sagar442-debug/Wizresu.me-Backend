const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const clerkWebhookHandler = require("./clerkWebhookHandler");
const { Webhook } = require("svix");
const bodyParser = require("body-parser");
const Stripe = require("stripe");
const cors = require("cors");
const stripeRoute = require("./routes/stripeRoutes");
const StripeWebhook = require("./controller/StripeWebhook");
const pdf = require("pdf-parse");
const multer = require("multer");
var upload = multer();

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
connectDB();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
app.post(
  "/api/webhooks",
  bodyParser.raw({ type: "application/json" }),
  clerkWebhookHandler
);
app.use(
  "/api/stripe-webhook",
  bodyParser.raw({ type: "application/json" }),
  StripeWebhook
);
app.use("/api/stripe", stripeRoute);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) =>
  res.json({ message: "The api is working for Wizresu.me backend" })
);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use(express.raw());
app.post("/api/pdf/upload-pdf", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Process the file buffer
  const buff = req.file.buffer;

  pdf(buff)
    .then((data) => {
      // Log the extracted text
      res.send({ pdfText: data.text }); // Send the extracted text in the response
    })
    .catch((err) => {
      console.error("Error processing PDF:", err);
      res.status(500).json({ message: "Error parsing PDF" });
    });
});
