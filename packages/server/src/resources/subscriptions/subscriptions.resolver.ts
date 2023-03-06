import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSubscriptionInput } from './dto/create-subscription.input';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionsService } from './subscriptions.service';

@Resolver(() => Subscription)
export class SubscriptionsResolver {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Mutation(() => Subscription)
  createSubscription(
    @Args('createSubscriptionInput')
    createSubscriptionInput: CreateSubscriptionInput,
  ) {
    return this.subscriptionsService.create(createSubscriptionInput);
  }

  @Query(() => [Subscription], { name: 'subscriptions' })
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Query(() => Subscription, { name: 'subscription' })
  findOne(@Args('id') id: string) {
    return this.subscriptionsService.findOne(id);
  }

  // @Mutation(() => Subscription)
  // updateSubscription(
  //   @Args('updateSubscriptionInput')
  //   updateSubscriptionInput: UpdateSubscriptionInput,
  // ) {
  //   return this.subscriptionsService.update(
  //     updateSubscriptionInput.id,
  //     updateSubscriptionInput,
  //   );
  // }

  @Mutation(() => Subscription)
  removeSubscription(@Args('id', { type: () => Int }) id: number) {
    return this.subscriptionsService.remove(id);
  }
}
