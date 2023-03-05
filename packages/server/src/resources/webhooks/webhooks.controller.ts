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
} from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import Stripe from 'stripe';
import { Response } from 'express';
import { stripe } from '../stripe/stripe';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post()
  create(@Body() createWebhookDto: CreateWebhookDto) {
    return this.webhooksService.create(createWebhookDto);
  }

  // /webhooks/stripe
  @Post()
  stripe(@Req() request: Request, @Res() response: Response) {
    const sig = request.headers['stripe-signature'];

    let event: Stripe.DiscriminatedEvent;
    try {
      event = stripe.webhooks.constructEvent(
        request.body as any, // TODO
        sig,
        'whsec_50134607e33afb8cf7d9ef971794d960809bfc71ebb2f1290ca5eb4407ef51fc',
      ) as Stripe.DiscriminatedEvent;
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
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
