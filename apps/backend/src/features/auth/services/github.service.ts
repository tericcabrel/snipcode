import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput, UpdateUserInput, User } from '@snipcode/domain';
import { AppError } from '@snipcode/utils';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { EnvironmentVariables } from '../../../configs/environment';
import { GitHubUserResponse } from '../types';

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_API_USER_PROFILE_URL = 'https://api.github.com/user';

@Injectable()
export class GithubService {
  private httpClient: AxiosInstance = axios.create();

  constructor(private readonly configService: ConfigService<EnvironmentVariables, true>) {}

  async requestAccessTokenFromCode(code: string): Promise<string> {
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

    const response = await this.httpClient
      .post<{ access_token: string }>(`${GITHUB_AUTH_URL}?${authQueryString}`, requestBody, requestConfig)
      .catch((error) => {
        throw new AppError(`Failed to authenticate with GitHub: ${error.response.data.message}`, 'LOGIN_FAILED');
      });

    return response.data.access_token;
  }

  async retrieveGitHubUserData(accessToken: string): Promise<GitHubUserResponse> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    };

    const response = await this.httpClient
      .get<GitHubUserResponse>(GITHUB_API_USER_PROFILE_URL, requestConfig)
      .catch((error) => {
        throw new AppError(`Failed to retrieve GitHub user data: ${error.response.data.message}`, 'LOGIN_FAILED');
      });

    return response.data;
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

    const updateUserInput = new UpdateUserInput({
      name,
      oauthProvider: 'github',
      pictureUrl: avatar_url,
      roleId: user.roleId,
      timezone: user.timezone,
    });

    updateUserInput.isEnabled = user.isEnabled;

    return updateUserInput;
  };
}
