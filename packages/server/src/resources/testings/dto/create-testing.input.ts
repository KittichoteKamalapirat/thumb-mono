import { Field, InputType } from '@nestjs/graphql';
import { DurationType, TestingType } from '../entities/testing.entity';

@InputType()
export class CreateTestingInput {
  @Field()
  channelId: string; // a testing belongs to a channel

  @Field()
  type: TestingType;

  @Field()
  videoId: string;

  @Field()
  duration: number;

  @Field()
  durationType: DurationType;

  @Field()
  ori: string;

  @Field(() => [String])
  varis: string[];
}
