import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { CreateTestingInput } from './dto/create-testing.input';
import { TestHistory } from './dto/TestHistory.object';
import { UpdateTestingInput } from './dto/update-testing.input';
import { Testing, TestingType } from './entities/testing.entity';

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

  findAllOngoingTestings(type: TestingType) {
    return this.testingsRepository.find({
      where: { status: 'ongoing', type },
      relations: ['channel', 'channel.user'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} testing`;
  }

  update(id: number, updateTestingInput: UpdateTestingInput) {
    return `This action updates a #${id} testing`;
  }

  save(testing: Testing) {
    return this.testingsRepository.save(testing);
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

  getNextTestSubject(history, ori: string, varis: string[]) {
    const allTestSubjects = [ori, ...varis];

    let newSubject = '';

    if (history.length === 0) newSubject = varis[0];
    else {
      const currentSubject = history.at(-1)?.title as string; // TODO
      const indexInAllSubjects = allTestSubjects.indexOf(currentSubject);
      const newSubjectIndex = indexInAllSubjects + 1;
      // use the next one
      newSubject =
        allTestSubjects[
          newSubjectIndex >= allTestSubjects.length ? 0 : newSubjectIndex
        ];
    }

    return newSubject;
  }

  async addSubjectToHistory(testing: Testing) {
    try {
      const { varis, ori, history } = testing;

      const newSubject = this.getNextTestSubject(
        history,
        ori,
        varis.map((subject) => subject),
      );

      const newHistory: TestHistory = {
        value: newSubject,
        date: dayjs().toISOString(),
      };

      // add a new history object
      testing.history.push(newHistory);

      await this.testingsRepository.save(testing);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} testing`;
  }
}
