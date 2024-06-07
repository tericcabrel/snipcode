import request from 'supertest';

import { TestHelper } from '../../../utils/tests/helpers';
import { TestServer, startTestServer } from '../../../utils/tests/server';

const graphqlEndpoint = '/graphql';

describe('Test Folder', () => {
  let server: TestServer;
  let testHelper: TestHelper;

  beforeAll(async () => {
    server = await startTestServer();

    testHelper = new TestHelper(server.app, graphqlEndpoint);
  });

  beforeEach(async () => {
    await testHelper.cleanDatabase();
  });

  afterAll(async () => {
    await server.close();
  });

  test("Fail to create a folder when the parent folder doesn't exist", async () => {
    const { authToken } = await testHelper.createAuthenticatedUser({});

    const query = `
      mutation CreateFolder($input: CreateFolderInput!) {
        createFolder(input: $input) {
          id
        }
      }
    `;

    const variables = {
      input: {
        name: 'My First Folder',
        parentId: 'non-existent-folder-id',
      },
    };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query, variables })
      .expect(200);

    const [error] = response.body.errors;

    expect(error.extensions.code).toEqual('FOLDER_NOT_FOUND');
    expect(error.message).toEqual('The folder with the id non-existent-folder-id not found');
  });

  test('Fail to create a folder when a folder with the same name already exists in the parent folder', async () => {
    const { authToken, user } = await testHelper.createAuthenticatedUser({});

    await testHelper.createFolder(authToken, {
      name: 'My First Folder',
      parentId: user.rootFolderId,
    });

    const query = `
      mutation CreateFolder($input: CreateFolderInput!) {
        createFolder(input: $input) {
          id
        }
      }
    `;

    const variables = {
      input: {
        name: 'My First Folder',
        parentId: user.rootFolderId,
      },
    };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query, variables })
      .expect(200);

    const [error] = response.body.errors;

    expect(error.extensions.code).toEqual('FOLDER_ALREADY_EXIST');
    expect(error.message).toEqual('A folder named "My First Folder" already exists');
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip("Fail to create a folder when the parent folder doesn't belong to the authenticated user", async () => {
    const { authToken } = await testHelper.createAuthenticatedUser({});
    const { user: user2 } = await testHelper.createAuthenticatedUser({});

    const query = `
      mutation CreateFolder($input: CreateFolderInput!) {
        createFolder(input: $input) {
          id
        }
      }
    `;

    const variables = {
      input: {
        name: 'My First Folder',
        parentId: user2.rootFolderId,
      },
    };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query, variables })
      .expect(200);

    const [error] = response.body.errors;

    expect(error.extensions.code).toEqual('FOLDER_NOT_BELONG_TO_USER');
    expect(error.message).toEqual(
      `The folder with the id ${user2.rootFolderId} does not belong to the authenticated user`,
    );
  });

  test('Successfully create a folder', async () => {
    const { authToken, user } = await testHelper.createAuthenticatedUser({});

    const query = `
      mutation CreateFolder($input: CreateFolderInput!) {
        createFolder(input: $input) {
          __typename
          id
          name
          isFavorite
          subFolders {
            id
          }
          subFoldersCount
          parent {
            id
          }
          user {
            id
          }
        }
      }
    `;

    const variables = {
      input: {
        name: 'My First Folder',
        parentId: user.rootFolderId,
      },
    };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query, variables })
      .expect(200);

    const { createFolder } = response.body.data;

    expect(createFolder).toMatchObject({
      __typename: 'Folder',
      id: expect.any(String),
      isFavorite: false,
      name: 'My First Folder',
      parent: { id: user.rootFolderId },
      subFolders: [],
      subFoldersCount: 0,
      user: { id: user.id },
    });
  });
});
