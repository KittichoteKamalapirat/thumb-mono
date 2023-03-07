import { Field, InputType } from '@nestjs/graphql';
import { ProductName } from '../entities/product.entity';

@InputType()
export class CreateProductInput {
  @Field()
  stripeId: string;

  @Field()
  name: ProductName;

  @Field()
  subscriptionId: string;
}
