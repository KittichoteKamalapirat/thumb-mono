import { Field, ObjectType } from '@nestjs/graphql';
import { FieldError } from '../../../types/field-error.type';
import { Product } from '../entities/product.entity';

@ObjectType()
class ProductResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Product, { nullable: true })
  product?: Product;
}

export default ProductResponse;
