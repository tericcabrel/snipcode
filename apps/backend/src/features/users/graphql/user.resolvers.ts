import { ConfigService } from '@nestjs/config';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NewsletterService } from '@snipcode/domain';

import { EnvironmentVariables } from '../../../configs/environment';
import { SubscribeToNewsletterResult } from '../../../types/graphql.schema';
import { NEWSLETTER_SUBSCRIBE_SUCCESS } from '../../../utils/constants';

@Resolver('User')
export class UserResolvers {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
    private readonly newsletterService: NewsletterService,
  ) {}

  @Mutation()
  async subscribeToNewsletter(@Args('email') email: string): Promise<SubscribeToNewsletterResult> {
    const convertKitTagId = this.configService.get('CONVERTKIT_TAG_ID');

    await this.newsletterService.subscribe(email, [convertKitTagId]);

    return { message: NEWSLETTER_SUBSCRIBE_SUCCESS };
  }
}
