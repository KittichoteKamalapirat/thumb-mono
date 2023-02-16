import { ObjectType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType()
export class YoutubeVideo {
  @Field()
  @Column()
  videoId: string;

  @Field()
  @Column()
  thumbUrl: string;

  @Field()
  @Column()
  title: string;
}
