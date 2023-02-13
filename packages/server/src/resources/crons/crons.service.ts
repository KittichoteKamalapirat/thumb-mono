import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { TestingsService } from '../testings/testings.service';
import dayjs from 'dayjs';

@Injectable()
export class CronsService {
  //   @Cron(CronExpression.EVERY_SECOND)
  //   async updateContainerStatusCron() {
  //     console.log('1');
  //   }

  constructor(private testingsService: TestingsService) {}

  @Cron('0 * * * *')
  async updateTitleEveryDay() {
    try {
      const tests = await this.testingsService.findAllOngoingTitleTestings();

      // update title for each test
      const promiseArray = tests.map(async (test) => {
        const { startDate, duration, channelId, id } = test;
        if (!duration) return null;
        const endDate = dayjs(startDate).add(duration, 'day');
        const now = dayjs();
        if (endDate.isBefore(now)) {
          // 1. don't update title
          // 2. make as complete
          const completedTest = await this.testingsService.completeTest(id);

          return;
        } else {
          // 1. update title
          return await updateVideoTitle(test); // TODO
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
