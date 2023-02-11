import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChannelsService } from './channels.service';
import { Channel } from './entities/channel.entity';
import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';
import { google } from 'googleapis';
import { oauth2Client } from '../../oauthClient';

@Resolver(() => Channel)
export class ChannelsResolver {
  constructor(private readonly channelsService: ChannelsService) {}

  @Mutation(() => Channel)
  createChannel(
    @Args('createChannelInput') createChannelInput: CreateChannelInput,
  ) {
    return this.channelsService.create(createChannelInput);
  }

  @Query(() => [Channel], { name: 'channels' })
  findAll() {
    return this.channelsService.findAll();
  }

  @Query(() => Channel, { name: 'channel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.channelsService.findOne(id);
  }

  @Query(() => Boolean)
  async listChannel(@Args('channelId') channelId: string) {
    const tokens = await this.channelsService.getTokens(channelId);
    oauth2Client.setCredentials(tokens);
    const youtube = google.youtube({
      version: 'v3',
      auth: oauth2Client,
    });

    const result = await youtube.channels.list({
      part: ['snippet'],
      mine: true,
    });

    console.log('result', JSON.stringify(result, null, 4));

    return true;
  }

  @Mutation(() => Channel)
  updateChannel(
    @Args('updateChannelInput') updateChannelInput: UpdateChannelInput,
  ) {
    return this.channelsService.update(
      updateChannelInput.id,
      updateChannelInput,
    );
  }

  @Mutation(() => Channel)
  removeChannel(@Args('id', { type: () => Int }) id: number) {
    return this.channelsService.remove(id);
  }
}
