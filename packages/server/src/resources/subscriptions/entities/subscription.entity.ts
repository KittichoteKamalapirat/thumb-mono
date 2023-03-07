import { Field, ID, ObjectType } from '@nestjs/graphql';
import Stripe from 'stripe';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Product } from '../../products/entities/product.entity';

@ObjectType()
@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  stripeId: string; // event.data.object.subscription, stripe subscription id

  @Field()
  @Column()
  stripePriceId: string; // Can tell which price and which plan

  @Field()
  @Column()
  stripeCustomerId: string; // event.data.object.customer

  @Field()
  @Column()
  stripeProductId: string;

  @Field()
  @Column()
  status: Stripe.Subscription.Status;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  // relationships
  @Field()
  @Column()
  customerId: string; // event.data.object.client_reference_id (I added)

  @OneToOne(() => Customer, (customer) => customer.subscription, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field(() => Customer)
  customer: Customer;

  @OneToOne(() => Product, (product) => product.subscription, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product;
}
