const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function createProfessionalPrice() {
  try {
    const price = await stripe.prices.create({
      unit_amount: 499, // 4.99 USD, in cents
      currency: "usd",
      recurring: { interval: "month" }, // Recurring monthly
      product_data: {
        name: "Professional Subscription", // Plan name
      },
    });

    console.log("Professional Subscription Price Created:", price.id);
  } catch (err) {
    console.error("Error creating Professional price:", err);
  }
}

createProfessionalPrice();
