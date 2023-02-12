import { Field, ObjectType } from '@nestjs/graphql';
import { FieldError } from '../../../types/field-error.type';
import { UserChannel } from '../entities/user-channel.entity';

@ObjectType()
class UserChannelResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => UserChannel, { nullable: true })
  userChannel?: UserChannel;
}

export default UserChannelResponse;
