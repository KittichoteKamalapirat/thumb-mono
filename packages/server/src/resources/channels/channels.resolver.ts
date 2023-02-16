import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MyContext } from '../../types/context.type';
import { ChannelsService } from './channels.service';
import { CreateChannelInput } from './dto/create-channel.input';
import { Channel } from './entities/channel.entity';

@Resolver(() => Channel)
export class ChannelsResolver {
  constructor(private readonly channelsService: ChannelsService) {}

  @Mutation(() => Channel)
  createChannel(
    @Args('createChannelInput') createChannelInput: CreateChannelInput,
    @Context() { req }: MyContext,
  ) {
    return this.channelsService.create(createChannelInput, req);
  }

  @Query(() => [Channel], { name: 'channels' })
  findAll() {
    return this.channelsService.findAll();
  }

  @Query(() => Channel, { name: 'channel' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.channelsService.findOne(id);
  }

  @Query(() => Channel, { nullable: true })
  meChannel(@Context() { req }: MyContext): Promise<Channel | null> {
    if (!req.session.channelId) {
      return null;
    }

    // no need to await, why?
    return this.channelsService.findOneByYTChannelId(req.session.channelId);
  }

  // @Query(() => Boolean)
  // async listChannel(@Args('channelId') channelId: string) {
  //   const tokens = await this.channelsService.getTokens(channelId);
  //   oauth2Client.setCredentials(tokens);
  //   const youtube = google.youtube({
  //     version: 'v3',
  //     auth: oauth2Client,
  //   });

  //   const result = await youtube.channels.list({
  //     part: ['snippet'],
  //     mine: true,
  //   });

  //   return true;
  // }
}
