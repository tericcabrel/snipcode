import * as url from 'node:url';

import { SessionService } from '@snipcode/domain';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import request from 'supertest';

import { TestHelper } from '../../../utils/tests/helpers';
import { TestServer, startTestServer } from '../../../utils/tests/server';
import { GitHubUserResponse } from '../types';

const mockServer = setupServer(
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
);

describe('Test Authentication controller', () => {
  let server: TestServer;
  let testHelper: TestHelper;
  let sessionService: SessionService;

  beforeAll(async () => {
    server = await startTestServer();

    sessionService = server.app.get<SessionService>(SessionService);

    testHelper = new TestHelper(server.app);

    mockServer.listen({
      onUnhandledRequest: (req) => {
        if (req.url.includes('127.0.0.1') || req.url.includes('localhost')) {
          return;
        }
        console.error(`No request mock for [${req.method}] ${req.url}`);
      },
    });
  });

  beforeEach(async () => {
    await testHelper.cleanDatabase();
  });

  afterEach(() => mockServer.resetHandlers());

  afterAll(async () => {
    mockServer.close();
    await server.close();
  });

  test('Authenticate with GitHub', async () => {
    const response = await request(server.app.getHttpServer())
      .get('/auth/github/callback?code=valid_code')
      .send({})
      .expect(302);

    const parsedUrl = url.parse(response.headers.location, true);

    expect(`${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`).toBe('http://localhost:7500/auth/success');
    expect(parsedUrl.query.token).toBeDefined();

    const sessionToken = parsedUrl.query.token as string;
    const session = await sessionService.findByToken(sessionToken);

    expect(session).toBeDefined();

    const user = await testHelper.getAuthenticatedUser(sessionToken);

    expect(user).toMatchObject({
      id: expect.any(String),
      rootFolderId: expect.any(String),
    });
  });
});
