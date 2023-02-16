import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Testing } from '../../testings/entities/testing.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity()
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column({ unique: true })
  ytChannelId: string;

  @Field()
  @Column()
  channelName: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Field()
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.channels, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @OneToMany(() => Testing, (testing) => testing.channel, {
    cascade: true,
  })
  @Field(() => [Testing])
  testings: Testing[];
}
