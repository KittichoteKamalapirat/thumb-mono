import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { COOKIE_NAME, IS_PROD } from '../../constants';
import { oauth2Client } from '../../oauthClient';
import { MyContext, RequestWithSession } from '../../types/context.type';
import { ChannelsService } from '../channels/channels.service';
import { UsersService } from '../users/users.service';
import LoginResponse from './dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private channelsService: ChannelsService,
  ) {}

  async refreshTokens(channelId: string) {
    try {
      const token = await this.usersService.getTokens(channelId);
      oauth2Client.setCredentials(token);
      return true;
    } catch (error) {
      console.log('error', error);
    }
  }

  async logout({ req, res }: MyContext) {
    // todo
    // some users do not have tokens!
    const tokens = await this.usersService.getTokens(req.session.channelId);
    return new Promise((resolve) => {
      console.log('logout 1');
      // remove the session in redis`
      req.session.destroy((err) => {
        console.log('logout 2');
        res.clearCookie(COOKIE_NAME, {
          httpOnly: true,
          sameSite: 'lax',
          secure: IS_PROD,
        });

        console.log('logout 3');
        oauth2Client.revokeToken(tokens.refresh_token);
        if (err) {
          resolve(false);
          console.log('logout 4');
          console.log('error logging out', err);
          return;
        }
        console.log('logout 5');
        resolve(true); // logged out
        console.log('logout 6');
      });
    });
  }

  async getAuthURL() {
    const scopes = [
      'profile', // need to get email // See your personal info, including any personal info you've made publicly available
      'email', // See your primary Google Account email address => equal to https://www.googleapis.com/auth/userinfo.email
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
  // create user if not exist
  // create  channel if not exist (with token)
  async createAndSaveTokens(
    code: string,
    req: RequestWithSession,
  ): Promise<LoginResponse> {
    try {
      console.log('create and save tokens');
      console.log('code', code);

      const { tokens } = await oauth2Client.getToken(code); // this could be invalid_grant
      console.log('tokens from oAuth', tokens);

      console.log(1);

      // refresh_token receive only the first time
      const { refresh_token, access_token } = tokens;

      console.log(2);

      oauth2Client.setCredentials(tokens);

      console.log(3);
      const { ytChannelId, channelName } =
        await this.channelsService.getChannelInfoAfterCredentialsSet(); // need to set credentials before using this /// this could be invalid_grant even after setCredentials

      console.log(4);

      const email =
        await this.usersService.getEmailFromGoogleAfterCredentialsSet(tokens);

      // create (or retrieve) a user
      const userResponse = await this.usersService.create(
        { email, refresh_token, access_token },
        req,
      );

      // if no channel => just return a user
      if (!ytChannelId) {
        console.log('no channel for this user');
        return userResponse;
      }

      // create (or retrieve) a channel
      const channelResponse = await this.channelsService.create(
        {
          ytChannelId,
          channelName,
          userId: userResponse.user.id,
        },
        req,
      );

      console.log('channelResponse', channelResponse);
      return { ...channelResponse, ...userResponse };
    } catch (error) {
      console.log('error in catch', error);
      return { errors: [{ field: 'Channel', message: 'An error occured' }] };
    }
  }
}
