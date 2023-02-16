import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from '../../../types/field-error.type';
import { Testing } from '../entities/testing.entity';

@ObjectType()
class TestingResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Testing, { nullable: true })
  testing?: Testing;
}

export default TestingResponse;
