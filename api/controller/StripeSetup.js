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
    if (subscriptionId == process.env.PROFESSIONAL_PRICE) {
      priceId = process.env.PROFESSIONAL_PRICE; // Replace with the Price ID for Professional Subscription
    } else if (subscriptionId == process.env.PREMIUM_PRICE) {
      priceId = process.env.PREMIUM_PRICE; // Replace with the Price ID for the Basic Subscription
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
      allow_promotion_codes: true,
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
