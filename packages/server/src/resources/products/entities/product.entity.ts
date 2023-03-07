import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

const PRODUCT_NAME = {
  FREE_PLAN: 'Free Plan',
  STARTER_PLAN: 'Starter Plan',
  PROFESSIONAL_PLAN: 'Professional Plan',
} as const;

export type ProductName = ObjectValues<typeof PRODUCT_NAME>;

@ObjectType()
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  stripeId: string; // stripeProductId

  @Field()
  @Column()
  name: ProductName;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  // relationships
  @Field()
  @Column()
  subscriptionId: string; // event.data.object.client_reference_id (I added)

  @OneToOne(() => Subscription, (sub) => sub.product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field(() => Subscription)
  subscription: Subscription;
}
