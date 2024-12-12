const express = require("express");
const Stripe = require("stripe");
const User = require("../models/User");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// Use express.raw middleware only for the webhook route
app.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const payload = req.body;

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    if (event.type == "invoice.payment_succeeded") {
      const session = event.data.object;
      const user = await User.findOne({
        email: session.customer_email,
      });
      const lines = event.data.object.lines.data[0].price.id;
      console.log(lines);
      if (!user) {
        res.status(404).json({ message: "No user found!" });
        return;
      }

      user.subscription = lines;
      await user.save();
    }

    res.json({ received: true });
  } catch (err) {
    console.error(err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = app;
