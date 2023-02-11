import { Test, TestingModule } from '@nestjs/testing';
import { UserChannelsResolver } from './user-channels.resolver';
import { UserChannelsService } from './user-channels.service';

describe('UserChannelsResolver', () => {
  let resolver: UserChannelsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserChannelsResolver, UserChannelsService],
    }).compile();

    resolver = module.get<UserChannelsResolver>(UserChannelsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
