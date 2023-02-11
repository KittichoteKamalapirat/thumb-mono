import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestingInput } from './dto/create-testing.input';
import { UpdateTestingInput } from './dto/update-testing.input';
import { Testing } from './entities/testing.entity';

@Injectable()
export class TestingsService {
  constructor(
    @InjectRepository(Testing)
    private usersRepository: Repository<Testing>,
  ) {}

  create(createTestingInput: CreateTestingInput) {
    return 'This action adds a new testing';
  }

  findAll() {
    return `This action returns all testings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testing`;
  }

  update(id: number, updateTestingInput: UpdateTestingInput) {
    return `This action updates a #${id} testing`;
  }

  remove(id: number) {
    return `This action removes a #${id} testing`;
  }
}
