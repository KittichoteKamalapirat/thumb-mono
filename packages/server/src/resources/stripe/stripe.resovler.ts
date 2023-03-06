import { UseGuards } from '@nestjs/common';
import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MyContext } from '../../types/context.type';
import StringResponse from '../../types/string-response.input';
import { AuthGuard } from '../auth/auth.guard';

import { StripeService } from './stripe.service';

@Resolver()
export class StripeResolver {
  constructor(private readonly stripesService: StripeService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => StringResponse)
  createBillingPortalUrl(
    @Context() { req }: MyContext,
  ): Promise<StringResponse> {
    return this.stripesService.createBillingPortalUrl(req.session.userId);
  }
}
