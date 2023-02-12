import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelsService } from '../channels/channels.service';
import { UsersService } from '../users/users.service';
import { CreateUserChannelInput } from './dto/create-user-channel.input';
import { UpdateUserChannelInput } from './dto/update-user-channel.input';
import UserChannelResponse from './dto/user-channel-response';
import { UserChannel } from './entities/user-channel.entity';

@Injectable()
export class UserChannelsService {
  constructor(
    @InjectRepository(UserChannel)
    private userChannelsRepository: Repository<UserChannel>,
    private channelsService: ChannelsService,
    private usersService: UsersService,
  ) {}

  async addUserChannel({
    userId,
    channelId,
  }: CreateUserChannelInput): Promise<UserChannelResponse> {
    try {
      const user = await this.usersService.findOne(userId);
      const channel = await this.channelsService.findOne(channelId);

      if (!user)
        return {
          errors: [
            {
              field: 'User',
              message: 'Cannot find the user',
            },
          ],
        };

      if (!channel)
        return {
          errors: [
            {
              field: 'Channel',
              message: 'Cannot find the channel',
            },
          ],
        };

      const existingUserChannel = await this.userChannelsRepository.findOne({
        where: { userId, channelId },
      });

      if (existingUserChannel)
        return {
          errors: [
            {
              field: 'User Channel',
              message: 'You already have access to this channel',
            },
          ],
        };

      const newUserChannel = this.userChannelsRepository.create({
        userId,
        channelId,
      });
      const savedUserChannel = await this.userChannelsRepository.save(
        newUserChannel,
      );

      return { userChannel: savedUserChannel };
    } catch (error) {
      console.log('error', error);
      return {
        errors: [
          {
            field: 'User Channel',
            message: 'An error occur',
          },
        ],
      };
    }
  }

  findAll() {
    return `This action returns all userChannels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userChannel`;
  }

  update(id: number, updateUserChannelInput: UpdateUserChannelInput) {
    return `This action updates a #${id} userChannel`;
  }

  remove(id: number) {
    return `This action removes a #${id} userChannel`;
  }
}
