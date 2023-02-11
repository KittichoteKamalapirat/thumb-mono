import { Injectable } from '@nestjs/common';
import { CreateUserChannelInput } from './dto/create-user-channel.input';
import { UpdateUserChannelInput } from './dto/update-user-channel.input';

@Injectable()
export class UserChannelsService {
  create(createUserChannelInput: CreateUserChannelInput) {
    return 'This action adds a new userChannel';
  }

  findAll() {
    return `This action returns all userChannels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userChannel`;
  }

  update(id: number, updateUserChannelInput: UpdateUserChannelInput) {
    return `This action updates a #${id} userChannel`;
  }

  remove(id: number) {
    return `This action removes a #${id} userChannel`;
  }
}
