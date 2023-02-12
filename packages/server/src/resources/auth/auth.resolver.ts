import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MyContext } from '../../types/context.type';
import ChannelResponse from '../channels/dto/channel-response';
import UserResponse from '../users/dto/user-response';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import LoginResponse from './dto/login-response';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  // more appropriate with mutation
  @Mutation(() => String)
  async getAuthURL() {
    return this.authService.getAuthURL();
  }

  @Mutation(() => LoginResponse)
  async createAndSaveTokens(
    @Args('code') code: string,
    @Context() { req }: MyContext,
  ) {
    return this.authService.createAndSaveTokens(code, req);
  }

  @Query(() => User, { nullable: true })
  me(@Context() { req }: MyContext): Promise<User | null> {
    if (!req.session.channelId) {
      return null;
    }

    // no need to await, why?
    return this.usersService.findOne(req.session.channelId);
  }

  @Mutation(() => Boolean)
  logout(@Context() ctx: MyContext) {
    return this.authService.logout(ctx);
  }
}
