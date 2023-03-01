import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SummaryItem {
  @Field()
  subject: string;

  @Field()
  videoId: string;
  // metrics

  @Field()
  views: number;

  @Field()
  annotationClickThroughRate: number;

  @Field()
  annotationCloseRate: number;

  @Field()
  annotationClickableImpressions: number;

  @Field()
  averageViewDuration: number;

  @Field()
  comments: number;

  @Field()
  dislikes: number;

  @Field()
  estimatedMinutesWatched: number;

  @Field()
  likes: number;

  @Field()
  shares: number;

  @Field()
  subscribersGained: number;

  @Field()
  subscribersLost: number;
}
