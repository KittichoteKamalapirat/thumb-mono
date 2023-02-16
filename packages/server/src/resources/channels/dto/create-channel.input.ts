import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChannelInput {
  @Field(() => String)
  ytChannelId: string;

  @Field(() => String)
  channelName: string;

  @Field(() => String)
  userId: string;
}
