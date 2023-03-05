import dotenv from 'dotenv-safe';
import Stripe from 'stripe';

if (process.env.NODE_ENV) {
  switch (process.env.NODE_ENV) {
    case 'development':
      dotenv.config({
        path: `${__dirname}/../../.env.development`,
        allowEmptyValues: true,
      });
      break;
    default:
      break; // do nothing
  }
} else {
  dotenv.config({
    path: `${__dirname}/../../.env.development`,
    allowEmptyValues: true,
  });
}

export const getStripeClient = () => {
  console.log('process.env.STRIPE_API_SECRET', process.env.STRIPE_API_SECRET);
  return new Stripe(process.env.STRIPE_API_SECRET, {
    apiVersion: '2022-11-15', // according to docs
  });
};
