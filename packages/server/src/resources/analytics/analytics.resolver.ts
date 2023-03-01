import { Args, Query, Resolver } from '@nestjs/graphql';

import { AnalyticsService } from './analytics.service';
import { SummaryItem } from './dto/summmary-item.interface';

@Resolver()
export class AnalyticsResolver {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Query(() => [SummaryItem])
  stats(@Args('testingId') testingId: string) {
    return this.analyticsService.getStatsOneVid(testingId);
  }
}
