import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { google } from 'googleapis';
import { Repository } from 'typeorm';
import { oauth2Client } from '../../oauthClient';
import { RequestWithSession } from '../../types/context.type';
import ChannelResponse from './dto/channel-response';
import { CreateChannelInput } from './dto/create-channel.input';
import { Channel } from './entities/channel.entity';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>,
  ) {}

  async getChannelInfoAfterCredentialsSet() {
    console.log(111111);

    const youtube = google.youtube({
      version: 'v3',
      auth: oauth2Client,
    });

    console.log(2222222);

    const result = await youtube.channels.list({
      part: ['snippet'],
      mine: true,
    });

    console.log(333333);

    // if no channel => no items
    if (!result.data.items) {
      return { ytChannelId: '', channelName: '' };
    }
    const ytChannelId = result.data.items?.[0].id;
    const channelName = result.data.items[0].snippet.title;

    return { ytChannelId, channelName };
  }

  async create(
    input: CreateChannelInput,
    req: RequestWithSession,
  ): Promise<ChannelResponse> {
    try {
      const { ytChannelId, channelName, userId } = input;
      // set channelId in session

      // check whether channel already created
      const existing = await this.channelsRepository.findOne({
        where: { ytChannelId },
      });
      if (existing) return { channel: existing };
      const newChannel = this.channelsRepository.create({
        ytChannelId,
        channelName,
        userId,
        // token: { refresh_token, access_token },
      });

      const savedChannel = await this.channelsRepository.save(newChannel);

      req.session.channelId = savedChannel.id;

      return { channel: savedChannel };
    } catch (error) {
      return { errors: [{ field: 'channel', message: 'An error occured' }] };
    }
  }

  findAll() {
    return `This action returns all channels`;
  }

  findOne(id: string) {
    return this.channelsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  findOneByYTChannelId(ytChannelId: string) {
    return this.channelsRepository.findOne({
      where: { ytChannelId },
      relations: ['user'],
    });
  }
}
