import { Injectable } from '@nestjs/common';
import { CreateStripeInput } from './dto/create-stripe.input';
import { UpdateStripeInput } from './dto/update-stripe.input';
import { stripe } from './stripe';
import Stripe from 'stripe';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import BooleanResponse from '../../types/boolean-response.input';
import { CustomersService } from '../customers/customers.service';
import { UsersService } from '../users/users.service';
import StringResponse from '../../types/string-response.input';

@Injectable()
export class StripeService {
  constructor(
    private subscriptionsService: SubscriptionsService,
    private customersService: CustomersService,
    private usersService: UsersService,
  ) {}

  create(createStripeInput: CreateStripeInput) {
    return 'This action adds a new stripe';
  }

  constructEventFromPayload(signature: string, payload: Buffer) {
    // const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    return stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    ) as Stripe.DiscriminatedEvent;
  }

  async handleCheckoutSessionComplete(
    checkoutSession: Stripe.Checkout.Session,
  ): Promise<BooleanResponse> {
    console.log('handle checkout session');
    try {
      const stripeCustomerId = checkoutSession.customer as string;
      const userId = checkoutSession.client_reference_id;
      let customer = await this.customersService.findOneByStripeId(
        stripeCustomerId,
      );

      // create a customer if not exist yet
      if (!customer) {
        const result = await this.customersService.create({
          userId,
          stripeId: stripeCustomerId,
        });

        if (result.customer) customer = result.customer;
        else
          return {
            errors: [
              { field: 'customer', message: 'Error creating a new cusotomer' },
            ],
          };
      }
      // create a new subscription with active status

      const subscription = await stripe.subscriptions.retrieve(
        checkoutSession.subscription.toString(),
        { expand: ['items.data.price.product'] },
      );

      console.log('subscription', subscription);
      console.log('subscription.items.data[0]', subscription.items.data[0]);
      console.log(
        'subscription.items.data[0].price.product.toString()',
        subscription.items.data[0].price.product.toString(),
      );

      await this.subscriptionsService.create({
        customerId: customer.id,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        stripeProductId: (
          subscription.items.data[0].price.product as Stripe.Product
        ).id,
        stripeCustomerId: subscription.customer as string,
        status: subscription.status,
      });

      return { value: true };
    } catch (error) {
      console.log('error handling checkout session complete', error.message);
      return {
        errors: [
          {
            field: 'stripe',
            message: 'An error occured while completing a checkout session',
          },
        ],
      };
    }
  }

  handleUpdateSubscription() {
    // update a subscription
  }

  handleDeleteSubscription() {
    // update a subscription
  }

  findAll() {
    return `This action returns all stripe`;
  }

  async createBillingPortalUrl(userId: string): Promise<StringResponse> {
    try {
      const accountUrl = `${process.env.CORS_ORIGIN}/account`;

      const user = await this.usersService.findOne(userId);
      console.log('user', user);
      const stripeCustomerId = user.customer.stripeId;

      const portal = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: accountUrl,
      });
      return { value: portal.url };
    } catch (error) {
      console.log('error handling checkout session complete', error.message);
      return {
        errors: [
          {
            field: 'stripe',
            message: 'An error occured while creating a portal',
          },
        ],
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }

  update(id: number, updateStripeInput: UpdateStripeInput) {
    return `This action updates a #${id} stripe`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripe`;
  }
}
