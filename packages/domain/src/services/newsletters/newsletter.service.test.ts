import { Test, TestingModule } from '@nestjs/testing';
import { AppError } from '@snipcode/utils';
import nock from 'nock';

import { NewsletterService } from './newsletter.service';

const apiBaseURL = 'https://api.convertkit.com/v3';

describe('Newsletter service', () => {
  let newsletterService: NewsletterService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: NewsletterService,
          useValue: new NewsletterService({
            apiKey: 'apiKey',
            formId: 'formId',
          }),
        },
      ],
    }).compile();

    newsletterService = module.get<NewsletterService>(NewsletterService);
  });

  test('Add the email address to the newsletter subscribers', async () => {
    // GIVEN
    const emailToSubscribe = 'user@email.com';
    const tags = ['snipcode'];
    const formId = 'formId';

    const scope = nock(apiBaseURL)
      .post(`/forms/${formId}/subscribe`, {
        api_key: 'apiKey',
        email: emailToSubscribe,
        tags,
      })
      .reply(200, {
        subscription: {
          id: '123ABC',
        },
      });

    // WHEN
    await newsletterService.subscribe(emailToSubscribe, tags);

    // THEN
    expect(scope.isDone()).toBe(true);

    nock.cleanAll();
  });

  test('Handle HTTP error when the request to add the email address to the newsletter subscribers fails', async () => {
    // GIVEN
    const emailToSubscribe = 'user@email.com';
    const tags = ['snipcode'];
    const formId = 'formId';

    nock(apiBaseURL)
      .post(`/forms/${formId}/subscribe`, {
        api_key: 'apiKey',
        email: emailToSubscribe,
        tags,
      })
      .reply(400, {
        message: 'Wrong api key provided!',
      });

    // WHEN
    // THEN
    const caughtErrorsFormatted = {
      data: {
        message: 'Wrong api key provided!',
      },
      message: 'Request failed with status code 400',
      status: 400,
    };

    await expect(async () => {
      await newsletterService.subscribe(emailToSubscribe, tags);
    }).rejects.toThrow(new AppError(JSON.stringify(caughtErrorsFormatted, null, 2), 'NEWSLETTER_SUBSCRIBE_FAILED'));

    nock.cleanAll();
  });
});
