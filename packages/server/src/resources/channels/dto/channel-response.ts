import { ObjectType, Field } from '@nestjs/graphql';
import { Channel } from '../entities/channel.entity';
import { FieldError } from '../../../types/field-error.type';

@ObjectType()
class ChannelResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Channel, { nullable: true })
  channel?: Channel;
}

export default ChannelResponse;
