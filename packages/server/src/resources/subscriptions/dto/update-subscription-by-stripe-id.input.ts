import { Field, InputType } from '@nestjs/graphql';
import Stripe from 'stripe';

@InputType()
export class UpdateSubscriptionByStripeIdInput {
  @Field()
  stripeId: string;
  @Field()
  status: Stripe.Subscription.Status;
}
