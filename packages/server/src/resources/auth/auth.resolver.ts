import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MyContext } from '../../types/context.type';
import ChannelResponse from '../channels/dto/channel-response';
import UserResponse from '../users/dto/user-response';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
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

  @Mutation(() => ChannelResponse)
  async createAndSaveTokens(@Args('code') code: string) {
    return this.authService.createAndSaveTokens(code);
  }

  @Mutation(() => UserResponse)
  async login(
    @Args('input') input: LoginInput,
    @Context() { req }: MyContext,
  ): Promise<UserResponse> {
    return this.authService.login(input, req);
  }

  @Query(() => User, { nullable: true })
  me(@Context() { req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }

    // no need to await, why?
    return this.usersService.findOne(req.session.userId);
  }

  @Mutation(() => Boolean)
  logout(@Context() ctx: MyContext) {
    return this.authService.logout(ctx);
  }
}
