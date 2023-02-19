import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { channel } from 'diagnostics_channel';
import { MyContext } from '../../types/context.type';
import { AuthGuard } from '../auth/auth.guard';
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

  @UseGuards(AuthGuard)
  @Query(() => [Testing])
  myTestings(@Context() { req }: MyContext) {
    return this.testingsService.findByChannelId(req.session.channelId);
  }

  @Query(() => Testing, { nullable: true })
  testing(@Args('id') id: string) {
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
