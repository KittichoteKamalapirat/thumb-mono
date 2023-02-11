import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AppService } from '../../app.service';
import { RequestWithSession } from '../../types/context.type';
import { ChangePasswordInput } from './dto/change-password.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import UserResponse from './dto/user-response';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    data: CreateUserInput,
    req: RequestWithSession,
  ): Promise<UserResponse> {
    const errors = this.validateRegister(data);
    if (errors) {
      // if no error, return null as defined
      return { errors };
    }

    const salt = await bcrypt.genSalt(10);
    const hash = (await bcrypt.hash(data.password, salt)) as string;

    let user;
    try {
      const input = {
        email: data.email,
        password: hash,
      };
      const newUser = this.usersRepository.create(input);

      user = await this.usersRepository.save(newUser);

      return { user };
    } catch (error) {
      // if (error.detail.includes('username')) {
      //   return {
      //     errors: [
      //       {
      //         field: 'username',
      //         message: 'username already taken',
      //       },
      //     ],
      //   };
      // }
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
      if (error.detail.includes('phonenumber')) {
        return {
          errors: [
            {
              field: 'phonenumber',
              message: 'phonenumber already taken',
            },
          ],
        };
      }
    }
    // automatically logged in after register
    // set a cookie on the user
    req.session.userId = user.id;
  }

  validateRegister = (data: CreateUserInput) => {
    // if (data.username.length <= 2) {
    //   return [
    //     {
    //       field: 'username',
    //       message: 'Length must be greater than 2',
    //     },
    //   ];
    // }

    if (!data.email.includes('@')) {
      return [
        {
          field: 'email',
          message: 'email must include an @',
        },
      ];
    }

    if (data.password.length <= 2) {
      return [
        {
          field: 'password',
          message: 'Length must be greater than 2',
        },
      ];
    }
    // if there is not errors, return null
    return null;
  };

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  // findByUsername(username: string) {
  //   return this.usersRepository.findOne({ where: { username } });
  // }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async changePassword(userId: string, input: ChangePasswordInput) {
    const { newPassword, oldPassword } = input;
    try {
      // validate form input first
      if (newPassword.length < 6) {
        return {
          errors: [
            {
              field: 'newPassword', // match the frontend Field
              message: 'Length must be at least 6',
            },
          ],
        };
      }

      const user = await this.findOne(userId);

      if (!user) {
        return {
          errors: [{ field: 'user', message: 'Cannot find the user ' }],
        };
      }

      const valid = await bcrypt.compare(oldPassword, user.password);

      if (!valid) {
        return {
          errors: [
            {
              field: 'currentPassword',
              message: 'Incorrect password',
            },
          ],
        };
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      // user.password = await argon2.hash(newPassword);

      const newUser = await this.usersRepository.save(user);
      //  log in user after change password
      return {
        user: newUser,
      };
    } catch (error) {
      return {
        errors: [{ field: 'user', message: 'An error occured' }],
      };
    }
  }
}
