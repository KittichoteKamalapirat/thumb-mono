import { CreateUserChannelInput } from './create-user-channel.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserChannelInput extends PartialType(CreateUserChannelInput) {
  @Field(() => Int)
  id: number;
}
