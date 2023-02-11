import { Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType()
export class Token {
  @Field()
  @Column()
  refresh_token: string;
}
