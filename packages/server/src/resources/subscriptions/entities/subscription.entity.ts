import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  stripeId: string;

  @Field()
  @Column()
  stripePriceId: string;

  @Field()
  @Column()
  stripeProductName: string;

  @Field()
  @Column()
  status: 'free' | 'starter' | 'professional';

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
