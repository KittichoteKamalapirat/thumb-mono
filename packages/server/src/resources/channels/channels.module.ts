import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsResolver } from './channels.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  providers: [ChannelsResolver, ChannelsService],
  exports: [ChannelsService],
})
export class ChannelsModule {}
