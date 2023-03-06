import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field()
  stripeId: string;

  @Field()
  userId: string;
}
