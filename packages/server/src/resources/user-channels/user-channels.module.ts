import { Module } from '@nestjs/common';
import { UserChannelsService } from './user-channels.service';
import { UserChannelsResolver } from './user-channels.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChannel } from './entities/user-channel.entity';
import { UsersModule } from '../users/users.module';
import { ChannelsModule } from '../channels/channels.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserChannel]),
    UsersModule,
    ChannelsModule,
  ],
  providers: [UserChannelsResolver, UserChannelsService],
  exports: [UserChannelsService],
})
export class UserChannelsModule {}
