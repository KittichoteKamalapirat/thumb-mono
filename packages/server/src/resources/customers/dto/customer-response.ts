import { Field, ObjectType } from '@nestjs/graphql';
import { FieldError } from '../../../types/field-error.type';
import { Customer } from '../entities/customer.entity';

@ObjectType()
class CustomerResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Customer, { nullable: true })
  customer?: Customer;
}

export default CustomerResponse;
