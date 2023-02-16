import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { YoutubeVideo } from './dto/youtube-video.object';
import { YoutubeService } from './youtube.service';

@Resolver()
export class YoutubeResolver {
  constructor(private readonly youtubeService: YoutubeService) {}

  @UseGuards(AuthGuard)
  @Query(() => [YoutubeVideo])
  videos(@Args('channelId') channelId: string) {
    return this.youtubeService.findAll(channelId);
  }
}
