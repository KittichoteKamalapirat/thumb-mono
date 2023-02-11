import { Module } from '@nestjs/common';
import { UserChannelsService } from './user-channels.service';
import { UserChannelsResolver } from './user-channels.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChannel } from './entities/user-channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserChannel])],
  providers: [UserChannelsResolver, UserChannelsService],
  exports: [UserChannelsService],
})
export class UserChannelsModule {}
