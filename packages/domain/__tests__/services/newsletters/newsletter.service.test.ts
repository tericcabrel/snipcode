import SnipcodeError from '@snipcode/utils';
import nock from 'nock';

import NewsletterService from '../../../src/newsletters/newsletter.service';

const newsletterService = new NewsletterService({
  apiKey: 'apiKey',
  formId: 'formId',
});

const baseURL = 'https://api.convertkit.com/v3';

describe('Test the newsletter service', () => {
  test('Add the email address to the newsletter subscribers', async () => {
    // GIVEN
    const emailToSubscribe = 'user@email.com';
    const tags = ['snipcode'];
    const formId = 'formId';

    const scope = nock(baseURL)
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

    nock(baseURL)
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
    const catchErrorsFormatted = {
      data: {
        message: 'Wrong api key provided!',
      },
      message: 'Request failed with status code 400',
      status: 400,
    };

    await expect(async () => {
      await newsletterService.subscribe(emailToSubscribe, tags);
    }).rejects.toThrow(new SnipcodeError(JSON.stringify(catchErrorsFormatted, null, 2), 'NEWSLETTER_SUBSCRIBE_FAILED'));

    nock.cleanAll();
  });
});
