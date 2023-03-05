import { Injectable } from '@nestjs/common';
import { analytics, oauth2Client } from '../../oauthClient';
import { TestingsService } from '../testings/testings.service';
import { UsersService } from '../users/users.service';
import { StatsResponse } from './dto/stats.response';
import { SummaryItem } from './dto/summmary-item.interface';

const allZeroRow = (videoId: string) => [
  videoId,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]; // 12 metrices

@Injectable()
export class AnalyticsService {
  constructor(
    private usersService: UsersService,
    private testingsService: TestingsService,
  ) {}

  async getStatsOneVid(testingId: string): Promise<SummaryItem[]> {
    const testing = await this.testingsService.findOne(testingId);

    console.log('testing', testing);

    try {
      const videoId = testing.videoId;
      const userId = testing.channel.userId;
      const tokens = await this.usersService.getTokens(userId);

      oauth2Client.setCredentials(tokens); // TODO, have to remove access_token?

      const metrics =
        'views,annotationClickThroughRate,annotationClickableImpressions,annotationCloseRate,averageViewDuration,comments,dislikes,estimatedMinutesWatched,likes,shares,subscribersGained,subscribersLost';

      const formattedArray: SummaryItem[] = await Promise.all(
        testing.history.map(async (history) => {
          console.log(history);
          const data = await analytics.reports.query({
            dimensions: 'video',
            filters: `video==${videoId}`,
            ids: 'channel==MINE',
            metrics,
            endDate: this.formatDateForGoogle(new Date(history.date)),
            startDate: this.formatDateForGoogle(new Date(history.date)),
          });

          console.log('google data', data);

          const formatted = this.formatResponse(data, metrics, videoId);

          console.log('formatteddd', formatted);
          const testingSubject = this.testingsService.getSubjectFromIndex(
            testing,
            history.valueIndex,
          );

          const responseWithTestSubject = {
            ...formatted,
          } as SummaryItem;
          responseWithTestSubject.subject = testingSubject; // thumb url or title

          return responseWithTestSubject;
        }),
      );

      const calculated = this.calculateTestResult(formattedArray);
      console.log('calculateArrayyy', calculated);

      // console.log("data", data);

      // const formatted = formatResponse(data, metrics);

      return calculated;
    } catch (error) {
      console.log('error getting stats', error);
      return [];
    }
  }

  formatResponse(data: any, metrics: string, videoId: string): StatsResponse {
    console.log('lennnn', data.data.rows.length);

    // length will eithe by 1 (a lot of data) or 0 (no value)
    const results =
      data && data.data && data.data.rows.length !== 0
        ? data.data.rows
        : [allZeroRow(videoId)]; // empty array is truthy // note: has to be array of array

    data.data.rows.map((row) => console.log('rowwww', row));

    const keys = ['videoId', ...metrics.split(',')];

    const responseArr = results.map((item: string[]) => {
      const temp = {};
      for (let i = 0; i < keys.length; i++) temp[keys[i]] = item[i];
      return temp as StatsResponse;
    });
    console.log('responsee', responseArr);
    return responseArr[0];
  }

  formatDateForGoogle(d: Date) {
    const currDate = d.getDate();
    const currMonth = d.getMonth() + 1; // Months are zero based
    const currYear = d.getFullYear();

    const twoDigitDate =
      String(currDate).length === 1 ? '0' + String(currDate) : currDate;
    const twoDigitMonth =
      String(currMonth).length === 1 ? '0' + String(currMonth) : currMonth;

    const formatted = currYear + '-' + twoDigitMonth + '-' + twoDigitDate;
    return formatted;
  }

  reduceData(data: SummaryItem[]) {
    return data.reduce((m, d) => {
      if (!m[d.subject]) {
        m[d.subject] = { ...d, count: 1 };
        return m;
      }
      m[d.subject].views += d.views;
      m[d.subject].annotationClickThroughRate += d.annotationClickThroughRate;
      m[d.subject].annotationCloseRate += d.annotationCloseRate;
      m[d.subject].annotationClickableImpressions +=
        d.annotationClickableImpressions;
      m[d.subject].averageViewDuration += d.averageViewDuration;

      m[d.subject].comments += d.comments;
      m[d.subject].dislikes += d.dislikes;
      m[d.subject].estimatedMinutesWatched += d.estimatedMinutesWatched;
      m[d.subject].likes += d.likes;
      m[d.subject].shares += d.shares;

      m[d.subject].subscribersGained += d.subscribersGained;
      m[d.subject].subscribersLost += d.subscribersLost;

      m[d.subject].count += 1;
      m[d.subject].videoId = d.videoId;
      return m;
    }, {});
  }

  calculateTestResult(data: SummaryItem[]): SummaryItem[] {
    const reduced = this.reduceData(data);
    const result = Object.keys(reduced).map((k) => {
      const item = reduced[k];

      console.log('item', item);

      return {
        videoId: item.videoId,
        subject: item.subject,

        views: item.views / item.count,
        annotationClickThroughRate:
          item.annotationClickThroughRate / item.count,
        annotationCloseRate: item.annotationCloseRate / item.count,
        annotationClickableImpressions:
          item.annotationClickableImpressions / item.count,
        averageViewDuration: item.averageViewDuration / item.count,

        comments: item.comments / item.count,
        dislikes: item.dislikes / item.count,
        estimatedMinutesWatched: item.estimatedMinutesWatched / item.count,
        likes: item.likes / item.count,
        shares: item.shares / item.count,

        subscribersGained: item.subscribersGained / item.count,
        subscribersLost: item.subscribersLost / item.count,
      };
    });

    return result;
  }
}
