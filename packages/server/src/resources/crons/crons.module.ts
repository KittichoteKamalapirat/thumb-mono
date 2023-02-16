import { Module } from '@nestjs/common';
import { TestingsModule } from '../testings/testings.module';

import { YoutubeModule } from '../youtube/youtube.module';
import { CronsService } from './crons.service';

@Module({})
export class CronsModule {
  imports: [TestingsModule, YoutubeModule];
  providers: [CronsService];
  exports: [CronsService];
}
