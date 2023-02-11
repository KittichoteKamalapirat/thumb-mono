import { Test, TestingModule } from '@nestjs/testing';
import { TestingsService } from './testings.service';

describe('TestingsService', () => {
  let service: TestingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestingsService],
    }).compile();

    service = module.get<TestingsService>(TestingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
