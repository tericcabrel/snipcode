import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput, UpdateUserInput, User } from '@snipcode/domain';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { EnvironmentVariables } from '../../../configs/environment';
import { GitHubUserResponse } from '../types';

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_API_USER_PROFILE_URL = 'https://api.github.com/user';

@Injectable()
export class GithubService {
  private httpClient: AxiosInstance = axios.create();

  constructor(private readonly configService: ConfigService<EnvironmentVariables, true>) {}

  async requestAccessTokenFromCode(code: string) {
    const authQueryObject = {
      client_id: this.configService.get('GITHUB_CLIENT_ID'),
      client_secret: this.configService.get('GITHUB_CLIENT_SECRET'),
      code,
    };
    const requestConfig: AxiosRequestConfig = {
      headers: {
        accept: 'application/json',
      },
    };
    const requestBody = {};

    const authQueryString = new URLSearchParams(Object.entries(authQueryObject)).toString();

    return this.httpClient.post(`${GITHUB_AUTH_URL}?${authQueryString}`, requestBody, requestConfig);
  }

  async retrieveGitHubUserData(accessToken: string) {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    };

    return this.httpClient.get<GitHubUserResponse>(GITHUB_API_USER_PROFILE_URL, requestConfig);
  }

  generateUserRegistrationInputFromGitHubData = (data: GitHubUserResponse, roleId: string): CreateUserInput => {
    const { avatar_url, email, login, name } = data;

    const createUserInput = new CreateUserInput({
      email,
      name,
      oauthProvider: 'github',
      pictureUrl: avatar_url,
      roleId,
      timezone: null,
      username: login,
    });

    createUserInput.isEnabled = true;

    return createUserInput;
  };

  generateUserUpdateInputFromGitHubData = (user: User, data: GitHubUserResponse): UpdateUserInput => {
    const { avatar_url, name } = data;

    return new UpdateUserInput({
      name,
      oauthProvider: 'github',
      pictureUrl: avatar_url,
      roleId: user.roleId,
      timezone: user.timezone,
    });
  };
}
