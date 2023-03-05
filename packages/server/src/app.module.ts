import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormConfigNest } from './config/typeorm-nest.config';
import { AuthModule } from './resources/auth/auth.module';
import { ChannelsModule } from './resources/channels/channels.module';
import { CronsModule } from './resources/crons/crons.module';
import { FilesModule } from './resources/file/file.module';
import { TestingsModule } from './resources/testings/testings.module';
import { UsersModule } from './resources/users/users.module';
import { YoutubeModule } from './resources/youtube/youtube.module';
import { AnalyticsModule } from './resources/analytics/analytics.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './utils/getEnvPath';
import { WebhooksModule } from './resources/webhooks/webhooks.module';
import { StripeModule } from './resources/stripe/stripe.module';
import { SubscriptionsModule } from './resources/subscriptions/subscriptions.module';

const ENV = process.env.NODE_ENV;
const envPath = getEnvPath(ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPath,
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: [process.env.CORS_ORIGIN],
        credentials: true,
      },
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => {
        return { req, res };
      },
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfigNest),
    UsersModule,
    ChannelsModule,
    AuthModule,
    TestingsModule,
    YoutubeModule,
    CronsModule,
    FilesModule,
    AnalyticsModule,
    WebhooksModule,
    StripeModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
