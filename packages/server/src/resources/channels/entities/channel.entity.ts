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

@ObjectType()
@Entity()
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column({ unique: true })
  channelId: string;

  @Field()
  @Column()
  channelName: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @OneToMany(() => Testing, (testing) => testing.channel, {
    cascade: true,
  })
  @Field(() => [Testing])
  testings: Testing[];
}
