import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChannelInput {
  @Field(() => String)
  channelId: string;

  @Field(() => String)
  channelName: string;

  @Field(() => String)
  refresh_token: string;

  @Field(() => String)
  access_token: string;
}
