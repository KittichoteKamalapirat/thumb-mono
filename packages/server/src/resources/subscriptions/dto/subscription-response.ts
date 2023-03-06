import { Field, ObjectType } from '@nestjs/graphql';
import { FieldError } from '../../../types/field-error.type';
import { Subscription } from '../entities/subscription.entity';

@ObjectType()
class SubscriptionResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Subscription, { nullable: true })
  subscription?: Subscription;
}

export default SubscriptionResponse;
