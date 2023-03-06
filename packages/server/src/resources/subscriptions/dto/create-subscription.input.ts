import { Field, InputType } from '@nestjs/graphql';
import Stripe from 'stripe';

@InputType()
export class CreateSubscriptionInput {
  @Field()
  stripeSubscriptionId: string;

  @Field()
  stripePriceId: string;

  @Field()
  stripeCustomerId: string;

  @Field()
  stripeProductId: string;

  @Field()
  status: Stripe.Subscription.Status;

  @Field()
  customerId: string;
}
