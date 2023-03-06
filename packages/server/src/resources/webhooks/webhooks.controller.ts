/// <reference types="stripe-event-types" />
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  BadRequestException,
  Headers,
} from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import Stripe from 'stripe';
import { Response } from 'express';
import { stripe } from '../stripe/stripe';
import { StripeService } from '../stripe/stripe.service';
import RequestWithRawBody from '../../types/requestWithRawBody.interface';

@Controller('webhooks')
export class WebhooksController {
  constructor(
    private readonly webhooksService: WebhooksService,
    private stripeService: StripeService,
  ) {}

  @Post()
  create(@Body() createWebhookDto: CreateWebhookDto) {
    return this.webhooksService.create(createWebhookDto);
  }

  // /webhooks/stripe
  @Post('stripe')
  stripe(
    @Req() request: RequestWithRawBody,
    @Res() response: Response,
    @Headers('stripe-signature') signature: string, // request.headers['stripe-signature'];
  ) {
    console.log('incoming webhook');
    console.log('1');
    console.log('body', signature);

    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    let event: Stripe.DiscriminatedEvent;

    console.log('3');
    try {
      console.log('4');
      event = this.stripeService.constructEventFromPayload(
        signature,
        request.rawBody,
      );
    } catch (err) {
      console.log('error:', err.message);

      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log('5');
    console.log('event', event.type);
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        this.stripeService.handleCheckoutSessionComplete(event.data.object);
        break;
      case 'customer.subscription.updated':
        this.stripeService.handleSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        this.stripeService.handleSubscriptionDeleted(event.data.object);
        break;

      case 'subscription_schedule.canceled':
        const subscriptionScheduleCanceled = event.data.object;
        // Then define and call a function to handle the event subscription_schedule.canceled
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }

  @Get('hello')
  hello() {
    return 'hello';
  }

  @Get()
  findAll() {
    return this.webhooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webhooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebhookDto: UpdateWebhookDto) {
    return this.webhooksService.update(+id, updateWebhookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webhooksService.remove(+id);
  }
}
