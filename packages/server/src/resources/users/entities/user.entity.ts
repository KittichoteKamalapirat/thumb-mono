import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from '../../channels/entities/channel.entity';
import { Token } from '../../channels/entities/token.object';

type membership = 'basic' | 'premium' | 'pro';
@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column({ default: 'basic' })
  membership: membership;

  @Field(() => Token)
  @Column('jsonb')
  token: Token;

  @OneToMany(() => Channel, (channel) => channel.user, {
    cascade: true,
  })
  @Field(() => [Channel])
  channels: Channel[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
