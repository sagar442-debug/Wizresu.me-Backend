const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const StripeSetup = require("../controller/StripeSetup");
const StripeWebhook = require("../controller/StripeWebhook");

// Apply express.json() middleware for non-webhook routes
router.use(express.json());

// Route to create a checkout session
router.post("/create-checkout-session", StripeSetup);

// Route for Stripe Webhook (use raw body parsing)
router.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }), // Only for Stripe webhook
  StripeWebhook
);

module.exports = router;
