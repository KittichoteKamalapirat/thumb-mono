import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TestingsService } from './testings.service';
import { Testing } from './entities/testing.entity';
import { CreateTestingInput } from './dto/create-testing.input';
import { UpdateTestingInput } from './dto/update-testing.input';

@Resolver(() => Testing)
export class TestingsResolver {
  constructor(private readonly testingsService: TestingsService) {}

  @Mutation(() => Testing)
  createTesting(@Args('createTestingInput') createTestingInput: CreateTestingInput) {
    return this.testingsService.create(createTestingInput);
  }

  @Query(() => [Testing], { name: 'testings' })
  findAll() {
    return this.testingsService.findAll();
  }

  @Query(() => Testing, { name: 'testing' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.testingsService.findOne(id);
  }

  @Mutation(() => Testing)
  updateTesting(@Args('updateTestingInput') updateTestingInput: UpdateTestingInput) {
    return this.testingsService.update(updateTestingInput.id, updateTestingInput);
  }

  @Mutation(() => Testing)
  removeTesting(@Args('id', { type: () => Int }) id: number) {
    return this.testingsService.remove(id);
  }
}
