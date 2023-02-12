import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Credentials } from 'google-auth-library';
import { google } from 'googleapis';
import { Repository } from 'typeorm';
import { AppService } from '../../app.service';
import { oauth2Client } from '../../oauthClient';
import BooleanResponse from '../../types/boolean-response.input';
import { RequestWithSession } from '../../types/context.type';
import { AuthService } from '../auth/auth.service';
import { ChannelsService } from '../channels/channels.service';
import { CreateUserInput } from './dto/create-user.input';
import UserResponse from './dto/user-response';
import { User } from './entities/user.entity';

const SCOPE_ENDPOINT =
  'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
const getScopesUrl = (accessToken: string) => SCOPE_ENDPOINT + accessToken;

@Injectable()
export class UsersService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private channelsService: ChannelsService,
  ) {}

  // need access_token in a db to work (when oauth2Client.setCredentials(token); in refreshTokens)
  // unpure function
  async getEmailFromGoogleAfterCredentialsSet(
    channelId: string,
    tokens?: Credentials,
  ) {
    try {
      console.log('getEmailFromGoogleAfterCredentialsSet', 1);

      // await this.authService.refreshTokens(channelId);
      oauth2Client.setCredentials(tokens);

      console.log('getEmailFromGoogleAfterCredentialsSet', 2);

      const people = google.people({ version: 'v1', auth: oauth2Client });

      console.log('getEmailFromGoogleAfterCredentialsSet', 3);

      const response = await people.people.get({
        resourceName: 'people/me',
        personFields: 'emailAddresses',
      });

      console.log('getEmailFromGoogleAfterCredentialsSet', 4);
      return response.data.emailAddresses[0].value;
    } catch (error) {
      return '';
    }
  }

  async getEmailFromGoogle2(channelId: string) {
    await this.authService.refreshTokens(channelId);

    const { access_token } = await this.channelsService.getTokens(channelId);
    const url = getScopesUrl(access_token);

    const response = await axios.get(url);
    const data = response.data;
    const email = data.email;

    return email;
  }

  async create(
    { email }: CreateUserInput,
    req: RequestWithSession,
  ): Promise<UserResponse> {
    try {
      const existing = await this.usersRepository.findOne({ where: { email } });
      if (existing) {
        req.session.userId = existing.id;
        return { user: existing };
      }

      const input = {
        email,
      };
      const newUser = this.usersRepository.create(input);

      const savedUser = await this.usersRepository.save(newUser);

      // automatically logged in after register
      // set a cookie on the user
      req.session.userId = savedUser.id;

      return { user: savedUser };
    } catch (error) {
      if (error.detail.includes('email')) {
        return {
          errors: [
            {
              field: 'email',
              message: 'email already taken',
            },
          ],
        };
      }
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async remove(id: string): Promise<BooleanResponse> {
    try {
      const user = await this.findOne(id);
      if (!user)
        return {
          errors: [{ field: 'user', message: 'Cannot find the user ' }],
        };

      await this.usersRepository.delete(id);
      return { value: true };
    } catch (error) {
      return {
        errors: [{ field: 'user', message: 'An error occured' }],
      };
    }
  }
}
