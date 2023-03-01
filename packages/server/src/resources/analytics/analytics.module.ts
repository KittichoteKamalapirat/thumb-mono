import { Module } from '@nestjs/common';
import { TestingsModule } from '../testings/testings.module';
import { UsersModule } from '../users/users.module';
import { AnalyticsResolver } from './analytics.resolver';
import { AnalyticsService } from './analytics.service';

@Module({
  providers: [AnalyticsResolver, AnalyticsService],
  imports: [UsersModule, TestingsModule],
})
export class AnalyticsModule {}
