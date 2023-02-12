import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MyContext } from '../../types/context.type';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Mutation(() => UserResponse)
  // async register(
  //   @Args('input') input: CreateUserInput,
  //   @Context() { req }: MyContext,
  // ): Promise<UserResponse> {
  //   return this.usersService.create(input, req);
  // }

  @Query(() => String)
  getEmail(@Context() { req }: MyContext) {
    const channelid = req.session.channelId;
    return this.usersService.getEmailFromGoogleAfterCredentialsSet(channelid);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  // no change password since it's google login
  // @UseGuards(AuthGuard)
  // @Mutation(() => UserResponse)
  // async changePassword(
  //   @Args('input') input: ChangePasswordInput,
  //   @Context() { req }: MyContext,
  // ): Promise<UserResponse> {
  //   return this.usersService.changePassword(req.session.userId, input);
  // }
}
