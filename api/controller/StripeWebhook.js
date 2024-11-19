const Stripe = require("stripe");
const User = require("../models/User");

const StripeWebhook = async (req, res) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];
  const payload = req.body;
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle events
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const user = await User.findOne({
        email: session.customer_details.email,
      });
      if (!user) {
        res.status(404).json({ message: "No user found!" });
        return;
      }
      user.subscription = session.subscription;
      await user.save();
    }

    res.json({ received: true });
  } catch (err) {
    console.error(err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = StripeWebhook;
