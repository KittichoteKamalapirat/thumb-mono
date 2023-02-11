import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { COOKIE_NAME, IS_PROD } from '../../constants';
import { oauth2Client } from '../../oauthClient';
import { MyContext, RequestWithSession } from '../../types/context.type';
import { getChannelIdAfterCredentialsSet } from '../../utils/getChannelIdAfterCredentialsSet';
import { ChannelsService } from '../channels/channels.service';
import ChannelResponse from '../channels/dto/channel-response';
import UserResponse from '../users/dto/user-response';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private channelsService: ChannelsService,
  ) {}

  async login(data: LoginInput, req: RequestWithSession) {
    const response = await this.validateUser(data.email, data.password);
    if (response.user) {
      req.session.userId = response.user.id;
      return { user: response.user };
    } else {
      return { errors: response.errors };
    }
  }

  async validateUser(email: string, password: string): Promise<UserResponse> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      console.log('Cannot find a user');
      return {
        errors: [
          {
            field: 'email',
            message: 'A user with this email does not exist',
          },
        ],
      };
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Incorrect password',
          },
        ],
      };
    }

    return { user };
  }

  async logout({ req, res }: MyContext) {
    return new Promise((resolve) => {
      // remove the session in redis`
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME, {
          httpOnly: true,
          sameSite: 'lax',
          secure: IS_PROD,
        });
        if (err) {
          resolve(false);
          return;
        }
        resolve(true); // logged out
      });
    });
  }

  async getAuthURL() {
    const scopes = [
      // 'profile', // See your personal info, including any personal info you've made publicly available
      'email', // See your primary Google Account email address
      'https://www.googleapis.com/auth/youtube', // Manage your YouTube account
      // 'https://www.googleapis.com/auth/youtube.readonly', // View your YouTube account
      'https://www.googleapis.com/auth/yt-analytics.readonly', // View YouTube Analytics reports for your YouTube content
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });

    return url;
  }

  // google api login

  async createAndSaveTokens(code: string): Promise<ChannelResponse> {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      const { refresh_token } = tokens;

      oauth2Client.setCredentials(tokens);
      const channelId = (await getChannelIdAfterCredentialsSet()) as string; // need to set credentials before using this
      const channel = await this.channelsService.create({
        channelId,
        refresh_token,
      });
      return channel;
    } catch (error) {
      console.log('error in catch', error);
      return { errors: [{ field: 'Channel', message: 'An error occured' }] };
    }
  }
}
