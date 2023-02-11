import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ChannelResponse from './dto/channel-response';
import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';
import { Channel } from './entities/channel.entity';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>,
  ) {}

  async getTokens(channelId: string) {
    try {
      const existing = await this.channelsRepository.findOne({
        where: { channelId },
      });

      return existing.token;
    } catch (error) {
      console.log(error);
    }
  }
  async create(input: CreateChannelInput): Promise<ChannelResponse> {
    try {
      const { channelId, refresh_token } = input;

      // check whether channel already created
      const existing = await this.channelsRepository.findOne({
        where: { channelId },
      });
      if (existing) return { channel: existing };
      const newChannel = this.channelsRepository.create({
        channelId,
        token: { refresh_token },
      });

      const savedChannel = await this.channelsRepository.save(newChannel);

      return { channel: savedChannel };
    } catch (error) {
      return { errors: [{ field: 'channel', message: 'An error occured' }] };
    }
  }

  findAll() {
    return `This action returns all channels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} channel`;
  }

  update(id: number, updateChannelInput: UpdateChannelInput) {
    return `This action updates a #${id} channel`;
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}
