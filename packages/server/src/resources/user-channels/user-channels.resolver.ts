import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserChannelsService } from './user-channels.service';
import { UserChannel } from './entities/user-channel.entity';
import { CreateUserChannelInput } from './dto/create-user-channel.input';
import { UpdateUserChannelInput } from './dto/update-user-channel.input';

@Resolver(() => UserChannel)
export class UserChannelsResolver {
  constructor(private readonly userChannelsService: UserChannelsService) {}

  @Mutation(() => UserChannel)
  createUserChannel(
    @Args('createUserChannelInput')
    createUserChannelInput: CreateUserChannelInput,
  ) {
    return this.userChannelsService.create(createUserChannelInput);
  }

  @Query(() => [UserChannel], { name: 'userChannels' })
  findAll() {
    return this.userChannelsService.findAll();
  }

  @Query(() => UserChannel, { name: 'userChannel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userChannelsService.findOne(id);
  }

  @Mutation(() => UserChannel)
  updateUserChannel(
    @Args('updateUserChannelInput')
    updateUserChannelInput: UpdateUserChannelInput,
  ) {
    return this.userChannelsService.update(
      updateUserChannelInput.id,
      updateUserChannelInput,
    );
  }

  @Mutation(() => UserChannel)
  removeUserChannel(@Args('id', { type: () => Int }) id: number) {
    return this.userChannelsService.remove(id);
  }
}
