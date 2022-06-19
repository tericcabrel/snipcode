import axios, { AxiosInstance } from 'axios';

import { handleRequestError } from '../utils/axios-error';
import { NewsletterOption, SubscribeData, SubscribeInput } from './types';

export default class NewsletterService {
  private httpClient: AxiosInstance = axios.create();
  private readonly options: NewsletterOption;

  constructor(options: NewsletterOption) {
    this.options = options;

    this.initClient();
  }

  async subscribe(email: string, tags: string[]) {
    const inputBody: SubscribeInput = {
      api_key: this.options.apiKey,
      email,
      tags,
    };

    await this.httpClient
      .post<SubscribeData>(`forms/${this.options.formId}/subscribe`, inputBody)
      .catch(handleRequestError('NEWSLETTER_SUBSCRIBE_FAILED'));
  }

  private initClient() {
    this.httpClient = axios.create({
      baseURL: 'https://api.convertkit.com/v3',
    });

    this.httpClient.defaults.headers.common['Accept'] = 'application/json';
    this.httpClient.defaults.headers.common['Content-Type'] = 'application/json';
    this.httpClient.defaults.timeout = 10000;
  }
}
