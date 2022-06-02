import { getEnv } from '@sharingan/utils';
import axios, { AxiosInstance } from 'axios';

import { handleRequestError } from '../utils/axios-error';
import { SubscribeData, SubscribeInput } from './types';

export default class NewsletterService {
  private httpClient: AxiosInstance = axios.create();
  private readonly apiKey: string;
  private readonly formId: string;

  constructor() {
    this.apiKey = getEnv('CONVERTKIT_API_KEY');
    this.formId = getEnv('CONVERTKIT_FORM_ID');

    this.initClient();
  }

  async subscribe(email: string) {
    const inputBody: SubscribeInput = {
      api_key: this.apiKey,
      email,
    };

    await this.httpClient
      .post<SubscribeData>(`forms/${this.formId}/subscribe`, inputBody)
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
