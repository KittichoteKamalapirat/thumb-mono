import { Module } from '@nestjs/common';

import { ChannelsModule } from '../channels/channels.module';
import { FilesModule } from '../file/file.module';
import { TestingsModule } from '../testings/testings.module';
import { YoutubeResolver } from './youtube.resolver';
import { YoutubeService } from './youtube.service';

@Module({
  imports: [TestingsModule, ChannelsModule, FilesModule], // TODO add file module, or only service?
  providers: [YoutubeService, YoutubeResolver],
  exports: [YoutubeService],
})
export class YoutubeModule {}
