import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserChannelInput {
  @Field()
  userId: string;

  @Field()
  channelId: string;
}
