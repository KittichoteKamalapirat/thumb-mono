import { Field, InputType } from '@nestjs/graphql';
import { CreateSubscriptionInput } from './create-subscription.input';

@InputType()
export class UpdateSubscriptionInput extends CreateSubscriptionInput {
  @Field()
  id: string;
}
