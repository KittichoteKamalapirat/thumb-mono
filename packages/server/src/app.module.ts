import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormConfigNest } from './config/typeorm-nest.config';
import { AuthModule } from './resources/auth/auth.module';
import { ChannelsModule } from './resources/channels/channels.module';
import { CronsService } from './resources/crons/crons.service';
import { UsersModule } from './resources/users/users.module';
import { YoutubeService } from './youtube/youtube.service';
import { FileService } from './file/file.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: ['http://localhost:5173'],
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
    TestingModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronsService, YoutubeService, FileService],
})
export class AppModule {}
