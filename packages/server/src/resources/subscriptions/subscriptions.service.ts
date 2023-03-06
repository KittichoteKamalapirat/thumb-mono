import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriptionInput } from './dto/create-subscription.input';
import SubscriptionResponse from './dto/subscription-response';
import { UpdateSubscriptionInput } from './dto/update-subscription.input';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  async create(input: CreateSubscriptionInput): Promise<SubscriptionResponse> {
    try {
      const newSub = this.subscriptionsRepository.create({
        ...input,
      });

      const savedSub = await this.subscriptionsRepository.save(newSub);

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

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionInput: UpdateSubscriptionInput) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
