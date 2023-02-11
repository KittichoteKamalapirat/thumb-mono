import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from '../../channels/entities/channel.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity()
export class UserChannel {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column('uuid')
  userId: string;

  @ManyToOne(() => User, (user) => user.channelConnections, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @Field()
  @Column('uuid')
  channelId: string;

  @ManyToOne(() => Channel, (channel) => channel.userConnections, {
    onDelete: 'CASCADE',
  })
  @Field(() => Channel)
  channel: Channel;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
