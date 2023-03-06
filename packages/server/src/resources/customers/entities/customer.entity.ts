import { Field, ID, ObjectType } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
@ObjectType()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column({ unique: true })
  stripeId: string;

  // relationships
  @OneToMany(() => Subscription, (sub) => sub.customer, {
    cascade: true,
  })
  @Field(() => [Subscription])
  subscriptions: Subscription[];

  @Field()
  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.customer, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
