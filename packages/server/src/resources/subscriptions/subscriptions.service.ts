import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { In, Repository } from 'typeorm';
import BooleanResponse from '../../types/boolean-response.input';
import { CreateProductInput } from '../products/dto/create-product.input';
import { ProductsService } from '../products/products.service';
import { CreateSubscriptionInput } from './dto/create-subscription.input';
import SubscriptionResponse from './dto/subscription-response';
import { UpdateSubscriptionByStripeIdInput } from './dto/update-subscription-by-stripe-id.input';
import { UpdateSubscriptionInput } from './dto/update-subscription.input';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    private productsService: ProductsService,
  ) {}

  async create(input: CreateSubscriptionInput): Promise<SubscriptionResponse> {
    try {
      const customerId = input.customerId;
      const existingSub = await this.subscriptionsRepository.findOne({
        where: { customerId },
      });

      if (existingSub)
        return {
          errors: [
            {
              field: 'subscription',
              message: 'This customer already has a subscription.',
            },
          ],
        };
      const newSub = this.subscriptionsRepository.create({
        ...input,
      });

      const savedSub = await this.subscriptionsRepository.save(newSub);

      // create a product in my db
      await this.productsService.create(input.stripeProductId, savedSub.id);

      return { subscription: savedSub };
    } catch (error) {
      return {
        errors: [
          {
            field: 'subscription',
            message: 'An error occured while creating a new subscription',
          },
        ],
      };
    }
  }

  findAll() {
    return `This action returns all subscriptions`;
  }

  findOne(id: string) {
    return this.subscriptionsRepository.findOne({ where: { id } });
  }

  findOneByStripeId(stripeId: string) {
    return this.subscriptionsRepository.findOne({ where: { stripeId } });
  }

  async update(input: UpdateSubscriptionInput): Promise<SubscriptionResponse> {
    try {
      // definitely exist because I just search for it
      // const existingSub = await this.findOne(input.id);
      // if (!existingSub)
      //   return {
      //     errors: [
      //       {
      //         field: 'subscription',
      //         message: 'Cannot find a subscription in my database',
      //       },
      //     ],
      //   };

      const savedSub = await this.subscriptionsRepository.save({
        id: input.id,
        status: input.status,
      });

      // update a product in my db
      await this.productsService.update(input.id, input.stripeProductId);

      return { subscription: savedSub };
    } catch (error) {
      return {
        errors: [
          {
            field: 'subscription',
            message: 'An error occured while updating a new subscription',
          },
        ],
      };
    }
  }

  async updateAllByStripeId(
    input: UpdateSubscriptionByStripeIdInput,
  ): Promise<BooleanResponse> {
    try {
      const stripeId = input.stripeId;
      const prevSubs = await this.subscriptionsRepository.find({
        where: { stripeId },
      });

      await Promise.all(
        prevSubs.map(async (sub) => {
          await this.subscriptionsRepository.save({
            id: sub.id,
            status: input.status,
          });
        }),
      );

      return { value: true };
    } catch (error) {
      return {
        errors: [
          {
            field: 'subscription',
            message: 'An error occured while updating a new subscription',
          },
        ],
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
