const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const StripeSetup = async (req, res) => {
  const frontendUrl = process.env.FRONTEND_PAGE;
  try {
    const { item } = req.body;
    console.log(item);
    if (!item) {
      return res.status(400).json({ error: "Item is required" });
    }
    console.log(item);
    const lineItem = {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price, // Amount in cents
      },
      quantity: item.quantity,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [lineItem], // Use the single line item
      mode: "payment",
      success_url: `${frontendUrl}success`,
      cancel_url: `${frontendUrl}`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

module.exports = StripeSetup;
