import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field(() => String)
  refresh_token: string;

  @Field(() => String)
  access_token: string;
}
