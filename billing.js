import stripePackage from "stripe";
import { calculateCost } from "./libs/billing-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  // inputs: number of notes and the Stripe token
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key from the environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  // Attempt to charge the customer through Stripe
  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    });
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }
}
