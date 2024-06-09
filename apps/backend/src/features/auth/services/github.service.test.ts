import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@snipcode/domain';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';

import { GithubService } from './github.service';
import { GitHubUserResponse } from '../types';

const server = setupServer(
  http.get('https://api.github.com/user', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (authHeader === 'token valid_token') {
      const user: GitHubUserResponse = {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        email: 'octocat@email.com',
        login: 'octocat',
        name: 'monalisa octocat',
      };

      return HttpResponse.json(user);
    }

    return HttpResponse.json({ message: 'Invalid token' }, { status: 401 });
  }),

  http.post('https://github.com/login/oauth/access_token', ({ request }) => {
    const url = new URL(request.url);

    const code = url.searchParams.get('code');
    const clientId = url.searchParams.get('client_id');
    const clientSecret = url.searchParams.get('client_secret');

    if (!code || !clientId || !clientSecret) {
      return HttpResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    if (code === 'valid_code') {
      const data = {
        access_token: 'valid_token',
      };

      return HttpResponse.json(data);
    }

    return HttpResponse.json({ message: 'Invalid token' }, { status: 401 });
  }),
);

describe('Test GithubService', () => {
  let githubService: GithubService;

  beforeAll(() =>
    server.listen({
      onUnhandledRequest: (req) => console.error(`No request mock for [${req.method}] ${req.url}`),
    }),
  );

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, GithubService],
    }).compile();

    githubService = app.get<GithubService>(GithubService);
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should return user data when access token is valid', async () => {
    const result = await githubService.retrieveGitHubUserData('valid_token');

    expect(result).toEqual({
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      email: 'octocat@email.com',
      login: 'octocat',
      name: 'monalisa octocat',
    });
  });

  it('should throw an error when access token is invalid', async () => {
    await expect(githubService.retrieveGitHubUserData('invalid_token')).rejects.toThrow();
  });

  it('should return access token when code is valid', async () => {
    const result = await githubService.requestAccessTokenFromCode('valid_code');

    expect(result).toEqual('valid_token');
  });

  it('should throw an error when code is invalid', async () => {
    await expect(githubService.requestAccessTokenFromCode('invalid_code')).rejects.toThrow();
  });

  it('should generate user registration input from GitHub data', () => {
    const data: GitHubUserResponse = {
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      email: 'octocat@email.com',
      login: 'octocat',
      name: 'monalisa octocat',
    };

    const result = githubService.generateUserRegistrationInputFromGitHubData(data, 'role_id');

    expect(result).toMatchObject({
      _input: {
        email: 'octocat@email.com',
        name: 'monalisa octocat',
        oauthProvider: 'github',
        pictureUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
        roleId: 'role_id',
        timezone: null,
        username: 'octocat',
      },
      enabled: true,
      hashedPassword: null,
      userId: expect.any(String),
    });
  });

  it('should generate user update input from GitHub data', () => {
    const data: GitHubUserResponse = {
      avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
      email: 'octocat@email.com',
      login: 'octocat',
      name: 'monalisa octocat 2',
    };

    const user: User = {
      createdAt: new Date(),
      email: 'octocat@email.com',
      id: 'userId',
      isEnabled: true,
      name: 'octocat',
      oauthProvider: 'github',
      password: 'password',
      pictureUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
      roleId: 'roleId',
      timezone: null,
      updatedAt: new Date(),
      username: 'octocat',
    };

    const result = githubService.generateUserUpdateInputFromGitHubData(user, data);

    expect(result).toMatchObject({
      _input: {
        name: 'monalisa octocat 2',
        oauthProvider: 'github',
        pictureUrl: 'https://avatars.githubusercontent.com/u/2?v=4',
        roleId: 'roleId',
        timezone: null,
      },
      enabled: true,
    });
  });
});
