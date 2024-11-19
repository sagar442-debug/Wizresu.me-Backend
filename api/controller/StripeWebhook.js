const StripeWebhook = async (req, res) => {
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
      console.log("Payment Successful:", session);
    }

    res.json({ received: true });
  } catch (err) {
    console.error(err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = StripeWebhook;
