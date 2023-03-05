import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { oauth2Client, youtube } from '../../oauthClient';
import { ChannelsService } from '../channels/channels.service';
import { FilesService } from '../file/files.service';
import { Testing } from '../testings/entities/testing.entity';
import { TestingsService } from '../testings/testings.service';
import { YoutubeVideo } from './dto/youtube-video.object';

@Injectable()
export class YoutubeService {
  constructor(
    private testingsService: TestingsService,
    private filesService: FilesService,
    private channelsService: ChannelsService,
  ) {}
  async updateVideoTitle(testing: Testing) {
    // Get refresh_token from DB
    console.log('inside update video title');
    try {
      const { videoId, varis, ori, history, channel } = testing;

      const tokens = channel.user.token; // has access_token and refresh_token
      console.log('tokens', tokens);
      console.log('before set credentials 1');

      oauth2Client.setCredentials(tokens); // TODO do I need this line

      console.log('oauth', oauth2Client);

      // Have only 1 setCredentials (with both access_token and refresh_token) seeem to work fine

      // console.log('before set credentials 2');
      // const { refresh_token } = tokens;;
      // oauth2Client.setCredentials({ refresh_token });

      console.log('before list youtube vids');

      // Get video
      const result = await youtube.videos.list({
        id: videoId,
        part: 'statistics,snippet',
      } as any); // TODOO

      console.log('after list youtube vids');
      const video = (result as any).data.items[0]; // TODO

      const { nextSubject: newTitle } = this.testingsService.getNextTestSubject(
        history,
        ori,
        varis.map((title) => title),
      );

      video.snippet.title = newTitle;

      console.log('before updateing title');
      // Update video
      await youtube.videos.update({
        requestBody: {
          id: videoId as string,
          snippet: {
            title: newTitle,
            categoryId: video.snippet.categoryId, // somehow need this line
          },
        },
        part: 'snippet',
      } as any); // TODO

      await this.testingsService.addSubjectToHistory(testing);

      return {
        newTitle,
        video,
      };
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  async updateVideoThumb(testing: Testing) {
    try {
      const { videoId, varis, ori, channel, history } = testing;

      // get url
      const { nextSubject: newThumbUrl } =
        this.testingsService.getNextTestSubject(
          history,
          ori,
          varis.map((thumb) => thumb),
        );

      // load the thumb image to local file path
      const { localPath } = await this.filesService.genArrbufFromUrl({
        url: newThumbUrl,
        filename: 'name',
        type: 'jpg',
      });

      // Get refresh_token from DB

      const tokens = channel.user.token;

      console.log('tokens', tokens);
      console.log('before', oauth2Client);

      oauth2Client.setCredentials(tokens);

      console.log('after 1', oauth2Client);
      const { refresh_token } = tokens;

      oauth2Client.setCredentials({ refresh_token }); // do not pass access token since it's already expired? // TODO think

      console.log('after 2', oauth2Client);

      console.log('after', oauth2Client);

      // Update thumbnail

      await youtube.thumbnails.set({
        videoId,
        media: {
          body: fs.createReadStream(localPath),
        },
      });

      console.log(333);
      // TODO delete the local loaded image
      await this.testingsService.addSubjectToHistory(testing);

      return true;
    } catch (error) {
      console.log('error updateThumbnail', error);
      return null;
    }
  }

  async findAll(channelId: string): Promise<YoutubeVideo[]> {
    if (!channelId) return [];
    const channel = await this.channelsService.findOneByYTChannelId(channelId);

    console.log('channel', channel);

    const tokens = channel.user.token;

    oauth2Client.setCredentials(tokens);

    // Get video
    const result = await youtube.search.list({
      part: ['snippet'],
      forMine: true,
      maxResults: 100,
      type: ['video'],
    });

    const uploads: YoutubeVideo[] = result.data.items?.map((item) => ({
      videoId: item.id?.videoId,
      thumbUrl: item.snippet?.thumbnails?.default?.url,
      title: item.snippet?.title,
    }));

    return uploads;
  }
}
