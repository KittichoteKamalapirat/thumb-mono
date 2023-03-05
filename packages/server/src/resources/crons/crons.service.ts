import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import dayjs from 'dayjs';
import { Testing } from '../testings/entities/testing.entity';
import { TestingsService } from '../testings/testings.service';
import { YoutubeService } from '../youtube/youtube.service';

@Injectable()
export class CronsService {
  //   @Cron(CronExpression.EVERY_SECOND)
  //   async updateContainerStatusCron() {
  //     console.log('1');
  //   }

  constructor(
    private testingsService: TestingsService,
    private youtubeService: YoutubeService,
  ) {}

  // @Timeout(1000)
  // @Cron('* * * * *') // every minute
  @Cron('0 * * * *') // every hour
  // @Cron('0 0 * * *') // evvery dayy
  // @Timeout(2000)
  async updateTitleEveryDay() {
    console.log('update title every day at midnightt');
    try {
      const tests = await this.testingsService.findAllOngoingTestings('title');

      // update title for each test
      const promiseArray = tests.map(async (test) => {
        const { startDate, duration, id } = test;
        if (!duration) return null;
        const endDate = dayjs(startDate).add(duration, 'day');
        const now = dayjs();
        if (endDate.isBefore(now)) {
          // 1. don't update title
          // 2. make as complete
          await this.testingsService.completeTest(id);

          return true;
        } else {
          // 1. update title
          return await this.youtubeService.updateVideoTitle(test); // TODO
        }
      });

      const results = await Promise.all(promiseArray);

      console.log('results', results);
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }

  @Cron('0 * * * *') // every hour
  // @Timeout(2000)
  async updateThumbEveryDay() {
    console.log('update thumbnail every day at midnight');
    try {
      const tests = await this.testingsService.findAllOngoingTestings('thumb');

      // update thumb for each test
      const promiseArray = tests.map(async (test) => {
        const { startDate, duration } = test;
        if (!duration) return null;
        const endDate = dayjs(startDate).add(duration, 'day');
        const now = dayjs();
        if (endDate.isBefore(now)) {
          // 1. don't update thumb
          // 2. make as complete

          const updatedTest: Testing = { ...test, status: 'complete' };
          await this.testingsService.save(updatedTest);
          return;
        } else {
          // 1. update thumb
          return await this.youtubeService.updateVideoThumb(test);
        }
      });

      const results = await Promise.all(promiseArray);

      console.log('results', results);
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }
}
