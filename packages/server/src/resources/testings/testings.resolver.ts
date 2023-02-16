import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTestingInput } from './dto/create-testing.input';
import { UpdateTestingInput } from './dto/update-testing.input';
import TestingResponse from './dto/user-response';
import { Testing } from './entities/testing.entity';
import { TestingsService } from './testings.service';

@Resolver(() => Testing)
export class TestingsResolver {
  constructor(private readonly testingsService: TestingsService) {}

  @Mutation(() => TestingResponse)
  createTesting(@Args('input') input: CreateTestingInput) {
    return this.testingsService.create(input);
  }

  @Query(() => [Testing], { name: 'testings' })
  findAll() {
    return this.testingsService.find();
  }

  @Query(() => Testing, { name: 'testing' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.testingsService.findOne(id);
  }

  @Mutation(() => Testing)
  updateTesting(
    @Args('updateTestingInput') updateTestingInput: UpdateTestingInput,
  ) {
    return this.testingsService.update(
      updateTestingInput.id,
      updateTestingInput,
    );
  }

  @Mutation(() => Testing)
  removeTesting(@Args('id', { type: () => Int }) id: number) {
    return this.testingsService.remove(id);
  }
}
