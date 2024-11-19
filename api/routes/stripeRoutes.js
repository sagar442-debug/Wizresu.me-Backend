const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const StripeSetup = require("../controller/StripeSetup");
const StripeWebhook = require("../controller/StripeWebhook");

router.post("/create-checkout-session", app.use(express.json()), StripeSetup);
router.post(
  "/stripe-webhook",
  bodyParser.raw({ type: "application/json" }),
  StripeWebhook
);

module.exports = router;
