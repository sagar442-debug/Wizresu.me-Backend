const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const StripeSetup = async (req, res) => {
  const frontendUrl = process.env.FRONTEND_PAGE;
  try {
    const { item, userEmail, subscriptionId } = req.body;

    if (!item || !subscriptionId) {
      return res
        .status(400)
        .json({ error: "Item and subscription are required" });
    }

    // Check the subscription type and use the appropriate Price ID
    let priceId;
    if (subscriptionId === "professional") {
      priceId = "price_1QMngCP0VMA4utUdYpZS8oL8"; // Replace with the Price ID for Professional Subscription
    } else if (subscriptionId === "premium") {
      priceId = "price_1QMnfPP0VMA4utUdaHvWHy7s"; // Replace with the Price ID for the Basic Subscription
    } else {
      return res.status(400).json({ error: "Invalid subscription type" });
    }

    const lineItem = {
      price: priceId, // Use the correct price ID based on subscription type
      quantity: item.quantity,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [lineItem],
      mode: "subscription", // Use subscription mode
      customer_email: userEmail,
      success_url: `${frontendUrl}`,
      cancel_url: `${frontendUrl}`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

module.exports = StripeSetup;
