import { Injectable } from '@nestjs/common';
import { oauth2Client, youtube } from '../../oauthClient';
import { FileService } from '../file/file.service';
import { Testing } from '../testings/entities/testing.entity';
import { TestingsService } from '../testings/testings.service';
import * as fs from 'fs';

@Injectable()
export class YoutubeService {
  constructor(
    private testingsService: TestingsService,
    private fileService: FileService,
  ) {}
  async updateVideoTitle(testing: Testing) {
    // Get refresh_token from DB
    try {
      const { videoId, varis, ori, channelId, history, channel } = testing;

      const tokens = channel.user.token;
      oauth2Client.setCredentials(tokens);

      // Get video
      const result = await youtube.videos.list({
        id: videoId,
        part: 'statistics,snippet',
      } as any); // TODOO

      const video = (result as any).data.items[0]; // TODO

      const newTitle = this.testingsService.getNextTestSubject(
        history,
        ori,
        varis.map((title) => title),
      );

      video.snippet.title = newTitle;

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
      const newThumbUrl = this.testingsService.getNextTestSubject(
        history,
        ori,
        varis.map((thumb) => thumb),
      );

      // load the thumb image to local file path
      const { localPath } = await this.fileService.genArrbufFromUrl({
        url: newThumbUrl,
        filename: 'name',
        type: 'jpg',
      });
      // Get refresh_token from DB

      const tokens = channel.user.token;
      oauth2Client.setCredentials(tokens);

      // Update thumbnail
      await youtube.thumbnails.set({
        videoId,
        media: {
          body: fs.createReadStream(localPath),
        },
      });

      // TODO delete the local loaded image
      await this.testingsService.addSubjectToHistory(testing);

      return true;
    } catch (error) {
      console.log('error updateThumbnail', error);
      return null;
    }
  }
}
