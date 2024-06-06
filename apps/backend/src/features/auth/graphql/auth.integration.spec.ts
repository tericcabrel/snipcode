import { SessionService } from '@snipcode/domain';
import { isValidUUIDV4 } from '@snipcode/utils';
import request from 'supertest';

import { TestHelper } from '../../../utils/tests/helpers';
import { TestServer, startTestServer } from '../../../utils/tests/server';

const graphqlEndpoint = '/graphql';

describe('Test Authentication', () => {
  let server: TestServer;
  let testHelper: TestHelper;
  let sessionService: SessionService;

  beforeAll(async () => {
    server = await startTestServer();

    sessionService = server.app.get<SessionService>(SessionService);

    testHelper = new TestHelper(server.app, graphqlEndpoint);
  });

  beforeEach(async () => {
    await testHelper.cleanDatabase();
  });

  afterAll(async () => {
    await server.close();
  });

  test('Register a user', async () => {
    const query = `
      mutation SignupUser($input: SignupUserInput!) {
        signupUser(input: $input) {
          __typename
          message
          userId
        }
      }
    `;
    const variables = {
      input: {
        email: 'jon.doe@snipcode.dev',
        name: 'John Doe',
        password: 'password',
      },
    };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query, variables })
      .expect(200);

    expect(response.body.data.signupUser).toMatchObject({
      __typename: 'SignupUserResult',
      message: 'Account created successfully!',
      userId: expect.any(String),
    });
  });

  test('Register a user with an existing email address will returns an error', async () => {
    const query = `
      mutation SignupUser($input: SignupUserInput!) {
        signupUser(input: $input) {
          __typename
          message
        }
      }
    `;
    const variables = {
      input: {
        email: 'jon.doe@snipcode.dev',
        name: 'John Doe',
        password: 'password',
      },
    };

    await testHelper.signupUser({ email: variables.input.email });

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query, variables })
      .expect(200);

    const [error] = response.body.errors;

    expect(error.extensions.code).toEqual('EMAIL_ALREADY_TAKEN');
    expect(error.message).toEqual('The email address is already taken');
  });

  test('Returns an error when authenticating with bad credentials', async () => {
    const query = `
      mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
          token
        }
      }
    `;
    const variables = {
      email: 'jon.doe@example.com',
      password: '123456',
    };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query, variables })
      .expect(200);

    const [error] = response.body.errors;

    expect(error.extensions.code).toEqual('LOGIN_FAILED');
    expect(error.message).toEqual('Invalid email address or password.');
  });

  test('Returns a token when authenticating with correct credentials', async () => {
    const query = `
      mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
          token
        }
      }
    `;

    await testHelper.signupUser({
      email: 'jane.doe@snipcode.dev',
      isEnabled: true,
      password: 'password',
    });

    const variables = {
      email: 'jane.doe@snipcode.dev',
      password: 'password',
    };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query, variables })
      .expect(200);

    const { loginUser } = response.body.data;

    expect(loginUser.token).toBeDefined();
    expect(isValidUUIDV4(loginUser.token)).toBe(true);

    const session = await sessionService.findByToken(loginUser.token);

    expect(session).toBeDefined();
  });

  test('Returns an error message when trying to authenticate with a disabled account', async () => {
    const query = `
      mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
          token
        }
      }
    `;

    await testHelper.signupUser({
      email: 'disabled.user@snipcode.dev',
      isEnabled: false,
      password: 'password',
    });

    const variables = {
      email: 'disabled.user@snipcode.dev',
      password: 'password',
    };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query, variables })
      .expect(200);

    const [error] = response.body.errors;

    expect(error.extensions.code).toEqual('ACCOUNT_DISABLED');
    expect(error.message).toEqual('Your account is disabled!');
  });

  test('Returns an error when retrieving the authenticated user without an authentication token', async () => {
    const authenticatedUserQuery = `
      query AuthenticatedUser {
        authenticatedUser {
          id
        }
      }
    `;

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query: authenticatedUserQuery })
      .expect(200);

    const [error] = response.body.errors;

    expect(error.extensions.code).toEqual('UNAUTHENTICATED');
    expect(error.message).toEqual('You must be authenticated to access to this resource.');
  });

  test('Retrieve the authenticated user', async () => {
    const input = {
      email: 'jon.doe@snipcode.dev',
      name: 'John Doe',
      password: 'password',
    };

    const { authToken, userId } = await testHelper.createAuthenticatedUser({ ...input });

    const authenticatedUserQuery = `
      query AuthenticatedUser {
        authenticatedUser {
          id
          name
          email
          isEnabled
          timezone
          username
          pictureUrl
          role {
            name
          }
          rootFolder {
            id
            name
          }
          createdAt
          oauthProvider
        }
      }
    `;

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query: authenticatedUserQuery })
      .expect(200);

    const { authenticatedUser } = response.body.data;

    expect(authenticatedUser).toMatchObject({
      createdAt: expect.any(Number),
      email: input.email,
      id: userId,
      isEnabled: true,
      name: input.name,
      oauthProvider: 'email',
      pictureUrl: null,
      role: {
        name: 'user',
      },
      rootFolder: {
        id: expect.any(String),
        name: `__${authenticatedUser.id}__`,
      },
      timezone: null,
      username: expect.any(String),
    });
  });

  test('Log out the authenticated user', async () => {
    const { authToken, userId } = await testHelper.createAuthenticatedUser({
      email: 'jane.doe@snipcode.dev',
      name: 'Jane Doe',
      password: 'password',
    });

    const authenticatedUserQuery = `
      query AuthenticatedUser {
        authenticatedUser {
          id
        }
      }
    `;

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query: authenticatedUserQuery })
      .expect(200);

    const { authenticatedUser } = response.body.data;

    expect(authenticatedUser.id).toEqual(userId);

    const logoutQuery = `
      mutation LogoutUser {
        logoutUser
      }
    `;

    await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query: logoutQuery })
      .expect(200);

    const afterLogoutResponse = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query: authenticatedUserQuery })
      .expect(200);

    const [error] = afterLogoutResponse.body.errors;

    expect(error.extensions.code).toEqual('UNAUTHENTICATED');
    expect(error.message).toEqual('You must be authenticated to access to this resource.');
  });
});
