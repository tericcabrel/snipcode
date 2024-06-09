import request from 'supertest';

import { TestHelper } from '../../../utils/tests/helpers';
import { TestServer, startTestServer } from '../../../utils/tests/server';

const graphqlEndpoint = '/graphql';

describe('Test Folder Feature', () => {
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
    expect(error.message).toEqual('The folder with the id "non-existent-folder-id" not found');
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

  test("Fail to create a folder when the parent folder doesn't belong to the authenticated user", async () => {
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

    expect(error.extensions.code).toEqual('FOLDER_NOT_BELONGING_TO_USER');
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

  test('Display the directory of a user', async () => {
    const { authToken, user } = await testHelper.createAuthenticatedUser({});
    const blogFolderId = await testHelper.createFolder(authToken, {
      name: 'Blog',
      parentId: user.rootFolderId,
    });

    const blogPostFolderId = await testHelper.createFolder(authToken, {
      name: 'Blog post 1',
      parentId: blogFolderId,
    });

    const codingFolderId = await testHelper.createFolder(authToken, {
      name: 'Coding',
      parentId: user.rootFolderId,
    });

    const snippetId = await testHelper.createSnippet(authToken, {
      folderId: user.rootFolderId,
      name: 'My first snippet',
    });

    const blogSnippetId = await testHelper.createSnippet(authToken, {
      folderId: blogFolderId,
      name: 'auth.ts',
    });

    const query = `
      query ListDirectory($folderId: String!) {
        listDirectory(folderId: $folderId) {
          folders {
            id
            name
          }
          paths {
            id
            name
          }
          snippets {
            id
            name
          }
        }
      }
    `;

    const variables = {
      folderId: user.rootFolderId,
    };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query, variables })
      .expect(200);

    const { listDirectory } = response.body.data;

    expect(listDirectory).toMatchObject({
      folders: [
        {
          id: blogFolderId,
          name: 'Blog',
        },
        {
          id: codingFolderId,
          name: 'Coding',
        },
      ],
      paths: [],
      snippets: [
        {
          id: snippetId,
          name: 'My first snippet',
        },
      ],
    });

    const subFolderVariables = {
      folderId: blogFolderId,
    };

    const subFolderResponse = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query, variables: subFolderVariables })
      .expect(200);

    expect(subFolderResponse.body.data.listDirectory).toMatchObject({
      folders: [
        {
          id: blogPostFolderId,
          name: 'Blog post 1',
        },
      ],
      paths: [
        {
          id: blogFolderId,
          name: 'Blog',
        },
      ],
      snippets: [
        {
          id: blogSnippetId,
          name: 'auth.ts',
        },
      ],
    });
  });
});
