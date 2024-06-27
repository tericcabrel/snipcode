import { Test, TestingModule } from '@nestjs/testing';
import { AppError, errors, generateRandomId } from '@snipcode/utils';

import { Snippet } from './snippet.entity';
import { SnippetService } from './snippet.service';
import { TestHelper } from '../../../tests/helpers';
import { DomainModule } from '../../domain.module';
import { PrismaService } from '../prisma.service';
import { RoleService } from '../roles/role.service';

describe('Test Snippet service', () => {
  let snippetService: SnippetService;
  let roleService: RoleService;
  let testHelper: TestHelper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DomainModule.forRootAsync({
          useFactory: () => {
            return {
              convertKit: {
                apiKey: 'apiKey',
                formId: 'formId',
              },
              databaseUrl: process.env.DATABASE_URL,
            };
          },
        }),
      ],
      providers: [RoleService, SnippetService],
    }).compile();

    snippetService = module.get<SnippetService>(SnippetService);
    roleService = module.get<RoleService>(RoleService);

    const prismaService = module.get<PrismaService>(PrismaService);

    testHelper = new TestHelper(prismaService);

    await testHelper.cleanDatabase();
    await roleService.loadRoles();
  });

  test('Create a snippet in a folder', async () => {
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const createSnippetInput = TestHelper.createTestSnippetInput({ folderId: rootFolder.id, userId: user.id });

    const expectedSnippet = await snippetService.create(createSnippetInput);

    expect(expectedSnippet).toMatchObject<Snippet>({
      content: createSnippetInput.toSnippet().content,
      contentHtml: createSnippetInput.toSnippet().contentHtml,
      createdAt: expect.any(Date),
      description: createSnippetInput.toSnippet().description,
      folderId: rootFolder.id,
      id: createSnippetInput.toSnippet().id,
      language: createSnippetInput.toSnippet().language,
      lineHighlight: createSnippetInput.toSnippet().lineHighlight,
      name: createSnippetInput.toSnippet().name,
      size: createSnippetInput.toSnippet().size,
      theme: createSnippetInput.toSnippet().theme,
      updatedAt: expect.any(Date),
      userId: user.id,
      visibility: createSnippetInput.toSnippet().visibility,
    });

    await testHelper.deleteTestSnippetsById([expectedSnippet.id]);
    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  test('Can not create a snippet because the specified folder does not exist', async () => {
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const createSnippetInput = TestHelper.createTestSnippetInput({ folderId: generateRandomId(), userId: user.id });

    await expect(async () => {
      await snippetService.create(createSnippetInput);
    }).rejects.toThrow(new AppError(errors.FOLDER_NOT_FOUND(createSnippetInput.folderId), 'FOLDER_NOT_FOUND'));

    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  test('Can not create a snippet because it already exists in the specified folder', async () => {
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const snippet = await testHelper.createTestSnippet({ folderId: rootFolder.id, name: 'app.tsx', userId: user.id });

    const sameCreateSnippetInput = TestHelper.createTestSnippetInput({
      folderId: rootFolder.id,
      name: 'app.tsx',
      userId: user.id,
    });

    await expect(() => snippetService.create(sameCreateSnippetInput)).rejects.toThrow(
      new AppError(errors.SNIPPET_ALREADY_EXIST(sameCreateSnippetInput.name), 'SNIPPET_ALREADY_EXIST'),
    );

    await testHelper.deleteTestSnippetsById([snippet.id]);
    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  test('Retrieve all the public snippets', async () => {
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const existingSnippets = await Promise.all([
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
    ]);

    const publicSnippets = await snippetService.findPublicSnippet({ itemPerPage: 10 });

    expect(publicSnippets.hasMore).toEqual(false);
    expect(publicSnippets.nextCursor).toEqual(null);
    expect(publicSnippets.items).toHaveLength(4);

    await testHelper.deleteTestSnippetsById(existingSnippets.map((snippet) => snippet.id));
    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  test('Retrieve three public snippets per page', async () => {
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const existingSnippets = await Promise.all([
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
    ]);

    const publicSnippets = await snippetService.findPublicSnippet({ itemPerPage: 3 });

    expect(publicSnippets.hasMore).toEqual(true);
    expect(publicSnippets.nextCursor).toEqual(expect.any(String));
    expect(publicSnippets.items).toHaveLength(3);

    await testHelper.deleteTestSnippetsById(existingSnippets.map((snippet) => snippet.id));
    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  test('Retrieve all snippets belonging to a user', async () => {
    const [user1, rootFolder1] = await testHelper.createUserWithRootFolder();
    const [user2, rootFolder2] = await testHelper.createUserWithRootFolder();

    const existingSnippets = await Promise.all([
      testHelper.createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'private' }),
      testHelper.createTestSnippet({ folderId: rootFolder2.id, userId: user2.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'private' }),
      testHelper.createTestSnippet({ folderId: rootFolder2.id, userId: user2.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder2.id, userId: user2.id, visibility: 'private' }),
    ]);

    const userSnippets = await snippetService.findByUser(user2.id);

    expect(userSnippets).toHaveLength(3);

    await testHelper.deleteTestSnippetsById(existingSnippets.map((snippet) => snippet.id));
    await testHelper.deleteTestFoldersById([rootFolder1.id, rootFolder2.id]);
    await testHelper.deleteTestUsersById([user1.id, user2.id]);
  });

  test('Retrieve a snippet by its ID', async () => {
    const [user1, rootFolder1] = await testHelper.createUserWithRootFolder();

    const snippet = await testHelper.createTestSnippet({
      folderId: rootFolder1.id,
      userId: user1.id,
      visibility: 'public',
    });

    const snippetFound = await snippetService.findById(snippet.id);

    expect(snippetFound).toMatchObject({
      folderId: rootFolder1.id,
      id: snippet.id,
      userId: user1.id,
      visibility: 'public',
    });

    await testHelper.deleteTestSnippetsById([snippet.id]);
    await testHelper.deleteTestFoldersById([rootFolder1.id]);
    await testHelper.deleteTestUsersById([user1.id]);
  });

  test("Can not find a snippet by the ID because it doesn't exists", async () => {
    const snippetId = generateRandomId();

    await expect(async () => {
      await snippetService.findById(snippetId);
    }).rejects.toThrow(new AppError(errors.SNIPPET_NOT_FOUND(snippetId), 'SNIPPET_NOT_FOUND'));
  });

  test('Delete a snippet belonging to a user', async () => {
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();

    const [snippet1, snippet2] = await Promise.all([
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
    ]);

    const deleteSnippetInput = TestHelper.deleteTestSnippetInput({ snippetId: snippet1.id, userId: snippet1.userId });

    await snippetService.delete(deleteSnippetInput);

    const folderSnippets = await snippetService.findByFolder(rootFolder.id);

    expect(folderSnippets).toHaveLength(1);

    await testHelper.deleteTestSnippetsById([snippet2.id]);
    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  test('Can not delete a snippet belonging to other user', async () => {
    const [user1, rootFolder1] = await testHelper.createUserWithRootFolder();
    const [user2, rootFolder2] = await testHelper.createUserWithRootFolder();

    const [snippet1, snippet2, snippet3] = await Promise.all([
      testHelper.createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder2.id, userId: user2.id, visibility: 'private' }),
      testHelper.createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'private' }),
    ]);

    const deleteSnippetInput = TestHelper.deleteTestSnippetInput({ snippetId: snippet1.id, userId: user2.id });

    await expect(async () => {
      await snippetService.delete(deleteSnippetInput);
    }).rejects.toThrow(
      new AppError(errors.CANT_EDIT_SNIPPET(deleteSnippetInput.creatorId, snippet1.id), 'CANT_EDIT_SNIPPET'),
    );

    const user1FolderSnippets = await snippetService.findByFolder(rootFolder1.id);
    const user2FolderSnippets = await snippetService.findByFolder(rootFolder2.id);

    expect(user1FolderSnippets).toHaveLength(2);
    expect(user2FolderSnippets).toHaveLength(1);

    await testHelper.deleteTestSnippetsById([snippet2.id, snippet3.id]);
    await testHelper.deleteTestFoldersById([rootFolder1.id, rootFolder2.id]);
    await testHelper.deleteTestUsersById([user1.id, user2.id]);
  });

  test('Update a snippet in a folder', async () => {
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const snippet = await testHelper.createTestSnippet({
      folderId: rootFolder.id,
      userId: user.id,
      visibility: 'public',
    });

    const updateSnippetInput = TestHelper.updateTestSnippetInput({ snippetId: snippet.id, userId: user.id });

    const updatedSnippet = await snippetService.update(updateSnippetInput);

    const snippetToUpdate = updateSnippetInput.toSnippet(snippet);

    expect(updatedSnippet).toMatchObject<Snippet>({
      content: snippetToUpdate.content,
      contentHtml: snippetToUpdate.contentHtml,
      createdAt: expect.any(Date),
      description: snippetToUpdate.description,
      folderId: rootFolder.id,
      id: snippet.id,
      language: snippetToUpdate.language,
      lineHighlight: snippetToUpdate.lineHighlight,
      name: snippetToUpdate.name,
      size: snippetToUpdate.size,
      theme: snippetToUpdate.theme,
      updatedAt: expect.any(Date),
      userId: user.id,
      visibility: snippetToUpdate.visibility,
    });

    await testHelper.deleteTestSnippetsById([updatedSnippet.id]);
    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  test('Can not update a snippet in a folder because another snippet with the updated name already exists inside', async () => {
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const [snippet] = await Promise.all([
      testHelper.createTestSnippet({ folderId: rootFolder.id, name: 'snippet-one.java', userId: user.id }),
      testHelper.createTestSnippet({
        folderId: rootFolder.id,
        name: 'snippet-two.java',
        userId: user.id,
        visibility: 'private',
      }),
    ]);

    const updateSnippetInput = TestHelper.updateTestSnippetInput({
      name: 'snippet-two.java',
      snippetId: snippet.id,
      userId: user.id,
    });

    await expect(async () => {
      await snippetService.update(updateSnippetInput);
    }).rejects.toThrow(new AppError(errors.SNIPPET_ALREADY_EXIST(updateSnippetInput.name), 'SNIPPET_ALREADY_EXIST'));

    await testHelper.deleteTestSnippetsById([snippet.id]);
    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  test('Can not update a snippet in a folder belonging to other user', async () => {
    const [user1, rootFolder1] = await testHelper.createUserWithRootFolder();
    const [user2, rootFolder2] = await testHelper.createUserWithRootFolder();
    const snippet = await testHelper.createTestSnippet({
      folderId: rootFolder1.id,
      name: 'snippet-one.java',
      userId: user1.id,
    });

    const updateSnippetInput = TestHelper.updateTestSnippetInput({ snippetId: snippet.id, userId: user2.id });

    await expect(async () => {
      await snippetService.update(updateSnippetInput);
    }).rejects.toThrow(
      new AppError(errors.CANT_EDIT_SNIPPET(updateSnippetInput.creatorId, snippet.id), 'CANT_EDIT_SNIPPET'),
    );

    await testHelper.deleteTestSnippetsById([snippet.id]);
    await testHelper.deleteTestFoldersById([rootFolder1.id, rootFolder2.id]);
    await testHelper.deleteTestUsersById([user1.id, user2.id]);
  });
});
