import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { join } from 'path';
import { AuthModule } from './resources/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfigNest } from './config/typeorm-nest.config';
import { ChannelsModule } from './resources/channels/channels.module';
import { TestingModule } from '@nestjs/testing';
import { UserChannelsModule } from './resources/user-channels/user-channels.module';

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
    TypeOrmModule.forRoot(typeormConfigNest),
    UsersModule,
    ChannelsModule,
    AuthModule,
    TestingModule,
    UserChannelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
