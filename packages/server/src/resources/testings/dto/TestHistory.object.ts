import { Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType()
export class TestHistory {
  @Field()
  @Column()
  date: string;

  @Field()
  @Column()
  valueIndex: number; // index in [ori, ... varis], see getNextTestSubject in testings.service.ts
}
