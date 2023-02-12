import { Field, ObjectType } from '@nestjs/graphql';
import { FieldError } from '../../../types/field-error.type';
import { Channel } from '../../channels/entities/channel.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
class LoginResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Channel, { nullable: true })
  channel?: Channel;

  @Field(() => User, { nullable: true })
  user?: User;
}

export default LoginResponse;
