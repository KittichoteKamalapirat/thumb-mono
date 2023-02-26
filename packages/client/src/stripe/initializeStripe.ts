import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(import.meta.env.VITE__STRIPE_API_KEY);
  }
  return stripePromise;
};

export default initializeStripe;
