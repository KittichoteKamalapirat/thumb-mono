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
      console.log('000');
      console.log('code', code);

      const { tokens } = await oauth2Client.getToken(code); // this could be invalid_grant
      console.log('tokens', tokens);

      console.log(111);

      // refresh_token receive only the first time
      const { refresh_token, access_token } = tokens;

      console.log(222);

      oauth2Client.setCredentials(tokens);

      console.log(333);
      const { channelId, channelName } =
        await this.channelsService.getChannelInfoAfterCredentialsSet(); // need to set credentials before using this /// this could be invalid_grant even after setCredentials

      console.log(444);

      // if no channel => create a user but not channel
      if (!channelId) {
        const email =
          await this.usersService.getEmailFromGoogleAfterCredentialsSet(
            channelId,
            tokens,
          );
        const userResponse = await this.usersService.create(
          { email, refresh_token, access_token },
          req,
        );
        return userResponse;
      }

      // create (or retrieve) a user
      const email =
        await this.usersService.getEmailFromGoogleAfterCredentialsSet(
          channelId,
          tokens,
        );
      const userResponse = await this.usersService.create(
        { email, refresh_token, access_token },
        req,
      );

      // create (or retrieve) a channel
      const channelResponse = await this.channelsService.create(
        {
          channelId,
          channelName,
        },
        req,
      );
      return { ...channelResponse, ...userResponse };
    } catch (error) {
      console.log('error in catch', error);
      return { errors: [{ field: 'Channel', message: 'An error occured' }] };
    }
  }
}
