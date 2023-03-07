import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsResolver } from './subscriptions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription]), ProductsModule],
  providers: [SubscriptionsResolver, SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
