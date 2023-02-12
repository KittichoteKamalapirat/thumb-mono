import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserChannel } from '../../user-channels/entities/user-channel.entity';

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

  // relationships
  @OneToMany(() => UserChannel, (userChannel) => userChannel.user, {
    cascade: true,
  })
  @Field(() => [UserChannel])
  channelConnections: UserChannel[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
