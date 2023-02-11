import { Test, TestingModule } from '@nestjs/testing';
import { TestingsResolver } from './testings.resolver';
import { TestingsService } from './testings.service';

describe('TestingsResolver', () => {
  let resolver: TestingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestingsResolver, TestingsService],
    }).compile();

    resolver = module.get<TestingsResolver>(TestingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
