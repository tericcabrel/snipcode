import request from 'supertest';

import { TestHelper } from '../../../utils/tests/helpers';
import { TestServer, startTestServer } from '../../../utils/tests/server';

const graphqlEndpoint = '/graphql';

describe('Test Snippet Feature', () => {
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

  test('Fail to create a snippet when the folder does not exist', async () => {
    const { authToken } = await testHelper.createAuthenticatedUser({});
    const query = `
      mutation CreateSnippet($input: CreateSnippetInput!) {
        createSnippet(input: $input) {
          id
        }
      }
    `;

    const variables = {
      input: {
        content: 'const a = 1;',
        contentHighlighted: '<span>const a = 1;</span>',
        description: 'This is a description',
        folderId: 'non-existent-folder-id',
        language: 'javascript',
        lineHighlight: '[]',
        name: 'Snippet 1',
        theme: 'github-dark-dimmed',
        visibility: 'public',
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

  test('Fail to create a snippet when a snippet with the same name already exists in the folder', async () => {
    const { authToken, user } = await testHelper.createAuthenticatedUser({});
    const folderId = await testHelper.createFolder(authToken, { name: 'JS Code', parentId: user.rootFolderId });

    await testHelper.createSnippet(authToken, { folderId, name: 'code-snippet.js' });

    const query = `
      mutation CreateSnippet($input: CreateSnippetInput!) {
        createSnippet(input: $input) {
          id
        }
      }
    `;

    const variables = {
      input: {
        content: 'const a = 1;',
        contentHighlighted: '<span>const a = 1;</span>',
        description: 'This is a description',
        folderId,
        language: 'javascript',
        lineHighlight: '[]',
        name: 'code-snippet.js',
        theme: 'github-dark-dimmed',
        visibility: 'public',
      },
    };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query, variables })
      .expect(200);

    const [error] = response.body.errors;

    expect(error.extensions.code).toEqual('SNIPPET_ALREADY_EXIST');
    expect(error.message).toEqual('A snippet named "code-snippet.js" already exists');
  });

  test('Create a snippet', async () => {
    const { authToken, user } = await testHelper.createAuthenticatedUser({});
    const folderId = await testHelper.createFolder(authToken, { name: 'JS Code', parentId: user.rootFolderId });

    const query = `
      mutation CreateSnippet($input: CreateSnippetInput!) {
        createSnippet(input: $input) {
          id
          name
          content
          contentHighlighted
          language
          lineHighlight
          size
          visibility
          description
          theme
          createdAt
          updatedAt
          folder {
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
        content: 'const a = 1;',
        contentHighlighted: '<span>const a = 1;</span>',
        description: 'This is a description',
        folderId,
        language: 'javascript',
        lineHighlight: '[]',
        name: 'code-snippet.js',
        theme: 'github-dark-dimmed',
        visibility: 'public',
      },
    };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query, variables })
      .expect(200);

    const { createSnippet } = response.body.data;

    expect(createSnippet).toMatchObject({
      content: 'const a = 1;',
      contentHighlighted: '<span>const a = 1;</span>',
      createdAt: expect.any(Number),
      description: 'This is a description',
      folder: { id: folderId },
      language: 'javascript',
      lineHighlight: '[]',
      name: 'code-snippet.js',
      size: expect.any(Number),
      theme: 'github-dark-dimmed',
      updatedAt: expect.any(Number),
      user: { id: user.id },
      visibility: 'public',
    });
  });

  test('Retrieve snippets of the authenticated user', async () => {
    const { authToken: user1AuthToken, user: user1 } = await testHelper.createAuthenticatedUser({});
    const { authToken: user2AuthToken, user: user2 } = await testHelper.createAuthenticatedUser({});

    const user1FolderId = await testHelper.createFolder(user1AuthToken, {
      name: 'TS Code',
      parentId: user1.rootFolderId,
    });
    const user2FolderId = await testHelper.createFolder(user2AuthToken, {
      name: 'JS Code',
      parentId: user2.rootFolderId,
    });

    await testHelper.createSnippet(user1AuthToken, { folderId: user1FolderId, name: 'code-snippet.ts' });
    const user2SnippetId = await testHelper.createSnippet(user2AuthToken, {
      folderId: user2FolderId,
      name: 'code-snippet.js',
    });

    const query = `
      query MySnippets {
        mySnippets {
          id
          name
          user {
            id
          }
        }
      }
    `;

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', user2AuthToken)
      .send({ query })
      .expect(200);

    const { mySnippets } = response.body.data;

    expect(mySnippets).toHaveLength(1);
    expect(mySnippets[0]).toMatchObject({
      id: user2SnippetId,
      name: 'code-snippet.js',
      user: { id: user2.id },
    });
  });

  test('Retrieve a snippet', async () => {
    const { authToken, user } = await testHelper.createAuthenticatedUser({});

    const folderId = await testHelper.createFolder(authToken, {
      name: 'All Codes',
      parentId: user.rootFolderId,
    });

    const subFolderId = await testHelper.createFolder(authToken, { name: 'TS Code', parentId: folderId });

    const snippetId = await testHelper.createSnippet(authToken, { folderId: subFolderId, name: 'code-snippet.ts' });

    const query = `
      query findSnippet($snippetId: String!) {
        findSnippet(snippetId: $snippetId) {
          snippet {
            id
            name
            user {
              id
            }
          }
          paths {
            id
            name
          }
        }
      }
    `;

    const variables = { snippetId };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', authToken)
      .send({ query, variables })
      .expect(200);

    const { findSnippet } = response.body.data;

    expect(findSnippet).toMatchObject({
      paths: [
        { id: folderId, name: 'All Codes' },
        { id: subFolderId, name: 'TS Code' },
      ],
      snippet: {
        id: snippetId,
        name: 'code-snippet.ts',
        user: { id: user.id },
      },
    });
  });

  test('Retrieve public snippets', async () => {
    const { authToken: user1AuthToken, user: user1 } = await testHelper.createAuthenticatedUser({});
    const { authToken: user2AuthToken, user: user2 } = await testHelper.createAuthenticatedUser({});

    const user1FolderId = await testHelper.createFolder(user1AuthToken, {
      name: 'TS Code',
      parentId: user1.rootFolderId,
    });
    const user2FolderId = await testHelper.createFolder(user2AuthToken, {
      name: 'JS Code',
      parentId: user2.rootFolderId,
    });

    const user1SnippetId = await testHelper.createSnippet(user1AuthToken, {
      folderId: user1FolderId,
      name: 'code-snippet.ts',
    });

    await testHelper.createSnippet(user1AuthToken, {
      folderId: user1FolderId,
      name: 'code-snippet-private.ts',
      visibility: 'private',
    });
    const user2SnippetId = await testHelper.createSnippet(user2AuthToken, {
      folderId: user2FolderId,
      name: 'code-snippet.js',
    });

    await testHelper.createSnippet(user2AuthToken, {
      folderId: user2FolderId,
      name: 'code-snippet-private.js',
      visibility: 'private',
    });

    const query = `
      query PublicSnippets($input: PublicSnippetsInput!) {
        publicSnippets(input: $input) {
          items {
            id
            name
            user {
              id
            }
          }
          hasMore
          itemPerPage
          nextToken
        }
      }
    `;

    const variables = {
      input: {
        itemPerPage: 10,
        keyword: null,
        nextToken: null,
        sortMethod: 'recently_created',
      },
    };

    const response = await request(server.app.getHttpServer())
      .post(graphqlEndpoint)
      .set('Authorization', user2AuthToken)
      .send({ query, variables });

    const { publicSnippets } = response.body.data;

    expect(publicSnippets).toHaveProperty('hasMore', false);
    expect(publicSnippets).toHaveProperty('itemPerPage', 10);
    expect(publicSnippets).toHaveProperty('nextToken', null);
    expect(publicSnippets.items).toHaveLength(2);
    expect(publicSnippets.items[0]).toMatchObject({
      id: user2SnippetId,
      name: 'code-snippet.js',
      user: { id: user2.id },
    });
    expect(publicSnippets.items[1]).toMatchObject({
      id: user1SnippetId,
      name: 'code-snippet.ts',
      user: { id: user1.id },
    });
  });
});
