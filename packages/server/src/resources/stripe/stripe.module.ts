import { Module } from '@nestjs/common';
import { CustomersModule } from '../customers/customers.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { UsersModule } from '../users/users.module';
import { StripeResolver } from './stripe.resovler';
import { StripeService } from './stripe.service';

@Module({
  imports: [SubscriptionsModule, CustomersModule, UsersModule],
  providers: [StripeResolver, StripeService],
  exports: [StripeService],
})
export class StripeModule {}
