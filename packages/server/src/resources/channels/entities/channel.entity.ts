import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Testing } from '../../testings/entities/testing.entity';
import { UserChannel } from '../../user-channels/entities/user-channel.entity';
import { Token } from './token.object';

@ObjectType()
@Entity()
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column({ unique: true })
  channelId: string;

  @Field(() => Token)
  @Column('jsonb')
  token: Token;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  // relationships
  @OneToMany(() => UserChannel, (userChannel) => userChannel.channel, {
    cascade: true,
  })
  @Field(() => [UserChannel])
  userConnections: UserChannel[];

  @OneToMany(() => Testing, (testing) => testing.channel, {
    cascade: true,
  })
  @Field(() => [Testing])
  testings: Testing[];
}
