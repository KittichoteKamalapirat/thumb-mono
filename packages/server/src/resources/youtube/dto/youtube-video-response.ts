import { ObjectType, Field } from '@nestjs/graphql';

import { FieldError } from '../../../types/field-error.type';
import { YoutubeVideo } from './youtube-video.object';

@ObjectType()
class YoutubeVideoResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => YoutubeVideo, { nullable: true })
  youtubeVideos?: YoutubeVideo;
}

export default YoutubeVideoResponse;
