import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from '../../channels/entities/channel.entity';
import { TestHistory } from '../dto/TestHistory.object';

const TestingTypes = ['thumb', 'title'] as const;
export type TestingType = (typeof TestingTypes)[number];

const TestingStatuses = ['ongoing', 'complete'] as const;
export type TestingStatus = (typeof TestingStatuses)[number];

const DurationTypes = ['specific', 'stats_significant'] as const;
export type DurationType = (typeof DurationTypes)[number];

@ObjectType()
@Entity()
export class Testing {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  type: TestingType;

  @Field()
  @Column({ default: 'ongoing' })
  status: TestingStatus;

  @Field(() => Int)
  @Column({ nullable: true })
  duration?: number;

  @Field()
  @Column()
  durationType: DurationType;

  @Field()
  @Column()
  videoId: string;

  @Field()
  @Column()
  videoTitle: string;

  @Field()
  @Column()
  videoThumbUrl: string;

  @Field()
  @Column()
  startDate: string; // iso utc

  @Field()
  @Column()
  channelId: string;

  @Field(() => [TestHistory])
  // @Column('jsonb', { array: true, default: [] }), had to remove array: true,otherwise error malformed array literal: "[{"value":"https://firebasestorage.googleapis.com/v0/b/thumb-be832.appspot.com/o/files%2FScreen%20Shot%202566-01-17%20at%2012.01.34.png?al
  @Column('jsonb', { default: [] })
  history: TestHistory[];

  @Field()
  @Column()
  ori: string; // title or url

  @Field(() => [String])
  @Column('jsonb')
  varis: string[]; // title or url

  @ManyToOne(() => Channel, (channel) => channel.testings, {
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
