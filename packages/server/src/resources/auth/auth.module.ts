import { Module } from '@nestjs/common';
import { ChannelsModule } from '../channels/channels.module';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, ChannelsModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
