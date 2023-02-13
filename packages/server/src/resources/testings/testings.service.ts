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
    private testingsRepository: Repository<Testing>,
  ) {}

  create(createTestingInput: CreateTestingInput) {
    return 'This action adds a new testing';
  }

  findAll(channelId) {
    return this.testingsRepository.find({ where: { channelId } });
  }

  findAllOngoingTitleTestings() {
    return this.testingsRepository.find({
      where: { status: 'ongoing', type: 'title' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} testing`;
  }

  update(id: number, updateTestingInput: UpdateTestingInput) {
    return `This action updates a #${id} testing`;
  }

  async completeTest(id: string) {
    try {
      const test = await this.testingsRepository.findOneBy({ id });

      if (!test) return new Error('Cannot find a test');

      const newTest = { ...test, status: 'complete' as const };

      const savedTest = await this.testingsRepository.save(newTest);

      return savedTest;
    } catch (error) {
      console.log('complete test error', error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} testing`;
  }
}
