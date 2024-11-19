// createSubscriptionPrice.js
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function createProfessionalPrice() {
  try {
    const price = await stripe.prices.create({
      unit_amount: 299, // Amount in cents (e.g., $20.00)
      currency: "usd",
      recurring: { interval: "month" }, // Recurring monthly
      product_data: {
        name: "Premium Subscription", // Plan name
      },
    });

    console.log("Recurring Price Created:", price.id);
  } catch (err) {
    console.error("Error creating price:", err);
  }
}

createProfessionalPrice();
