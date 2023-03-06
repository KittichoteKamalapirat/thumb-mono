import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateSubscriptionInput } from './create-subscription.input';

@InputType()
export class UpdateSubscriptionInput extends PartialType(
  CreateSubscriptionInput,
) {
  @Field()
  id: string;
}
