import { PrismaService, RoleService, UserService } from '@snipcode/domain';
import { isValidUUIDV4 } from '@snipcode/utils';
import request from 'supertest';

import { TestHelper } from '../../../utils/tests/helpers';
import { TestServer, startTestServer } from '../../../utils/tests/server';

const graphqlEndpoint = '/graphql';

describe('Test Authentication', () => {
  let server: TestServer;
  let testHelper: TestHelper;
  let prismaService: PrismaService;
  let roleService: RoleService;
  let userService: UserService;

  beforeAll(async () => {
    server = await startTestServer();

    prismaService = server.app.get<PrismaService>(PrismaService);
    userService = server.app.get<UserService>(UserService);
    roleService = server.app.get<RoleService>(RoleService);

    testHelper = new TestHelper(prismaService, roleService, userService);
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

    await testHelper.createTestUser({ email: variables.input.email });

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query, variables })
      .expect(200);

    expect(response.body.errors[0].extensions.code).toEqual('EMAIL_ALREADY_TAKEN');
    expect(response.body.errors[0].message).toEqual('The email address is already taken');
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

    expect(response.body.errors[0].extensions.code).toEqual('LOGIN_FAILED');
    expect(response.body.errors[0].message).toEqual('Invalid email address or password.');
  });

  test('Returns a token when authenticating with correct credentials', async () => {
    const query = `
      mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
          token
        }
      }
    `;

    await testHelper.createTestUser({
      email: 'jane.doe@snipcode.dev',
      isEnabled: true,
      password: 'password',
      role: 'user',
    });

    const variables = {
      email: 'jane.doe@snipcode.dev',
      password: 'password',
    };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query, variables })
      .expect(200);

    expect(response.body.data.loginUser.token).toBeDefined();
    expect(isValidUUIDV4(response.body.data.loginUser.token)).toBe(true);
  });

  test('Returns an error message when trying to authenticate with a disabled account', async () => {
    const query = `
      mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
          token
        }
      }
    `;

    await testHelper.createTestUser({
      email: 'disabled.user@snipcode.dev',
      isEnabled: false,
      password: 'password',
      role: 'user',
    });

    const variables = {
      email: 'disabled.user@snipcode.dev',
      password: 'password',
    };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query, variables })
      .expect(200);

    expect(response.body.errors[0].extensions.code).toEqual('ACCOUNT_DISABLED');
    expect(response.body.errors[0].message).toEqual('Your account is disabled!');
  });
});
