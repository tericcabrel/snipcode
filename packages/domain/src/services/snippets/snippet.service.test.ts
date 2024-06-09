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
          databaseUrl: process.env.DATABASE_URL,
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

  it('should create a snippet in the specified folder', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const createSnippetInput = TestHelper.createTestSnippetInput({ folderId: rootFolder.id, userId: user.id });

    // WHEN
    const expectedSnippet = await snippetService.create(createSnippetInput);

    // THEN
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

  it('should not create a snippet because the specified folder does not exist', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const createSnippetInput = TestHelper.createTestSnippetInput({ folderId: generateRandomId(), userId: user.id });

    // WHEN
    // THEN
    await expect(async () => {
      await snippetService.create(createSnippetInput);
    }).rejects.toThrow(new AppError(errors.FOLDER_NOT_FOUND(createSnippetInput.folderId), 'FOLDER_NOT_FOUND'));

    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should not create a snippet because it already exists in the specified folder', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const snippet = await testHelper.createTestSnippet({ folderId: rootFolder.id, name: 'app.tsx', userId: user.id });

    const sameCreateSnippetInput = TestHelper.createTestSnippetInput({
      folderId: rootFolder.id,
      name: 'app.tsx',
      userId: user.id,
    });

    // WHEN
    // THEN
    await expect(() => snippetService.create(sameCreateSnippetInput)).rejects.toThrow(
      new AppError(errors.SNIPPET_ALREADY_EXIST(sameCreateSnippetInput.name), 'SNIPPET_ALREADY_EXIST'),
    );

    await testHelper.deleteTestSnippetsById([snippet.id]);
    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should retrieve all public snippets', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const existingSnippets = await Promise.all([
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
    ]);

    // WHEN
    const publicSnippets = await snippetService.findPublicSnippet({ itemPerPage: 10 });

    // THEN
    await expect(publicSnippets.hasMore).toEqual(false);
    await expect(publicSnippets.nextCursor).toEqual(null);
    await expect(publicSnippets.items).toHaveLength(4);

    await testHelper.deleteTestSnippetsById(existingSnippets.map((snippet) => snippet.id));
    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should retrieve a subset of public snippets', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const existingSnippets = await Promise.all([
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
    ]);

    // WHEN
    const publicSnippets = await snippetService.findPublicSnippet({ itemPerPage: 3 });

    // THEN
    await expect(publicSnippets.hasMore).toEqual(true);
    await expect(publicSnippets.nextCursor).toEqual(expect.any(String));
    await expect(publicSnippets.items).toHaveLength(3);

    await testHelper.deleteTestSnippetsById(existingSnippets.map((snippet) => snippet.id));
    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should find all snippets of a user', async () => {
    // GIVEN
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

    // WHEN
    const userSnippets = await snippetService.findByUser(user2.id);

    // THEN
    await expect(userSnippets).toHaveLength(3);

    await testHelper.deleteTestSnippetsById(existingSnippets.map((snippet) => snippet.id));
    await testHelper.deleteTestFoldersById([rootFolder1.id, rootFolder2.id]);
    await testHelper.deleteTestUsersById([user1.id, user2.id]);
  });

  it('should retrieve a snippet by its ID', async () => {
    // GIVEN
    const [user1, rootFolder1] = await testHelper.createUserWithRootFolder();

    const snippet = await testHelper.createTestSnippet({
      folderId: rootFolder1.id,
      userId: user1.id,
      visibility: 'public',
    });

    // WHEN
    const snippetFound = await snippetService.findById(snippet.id);

    // THEN
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

  it('should found no snippet given the ID provided', async () => {
    // GIVEN
    const snippetId = generateRandomId();

    // WHEN
    // THEN
    await expect(async () => {
      await snippetService.findById(snippetId);
    }).rejects.toThrow(new AppError(errors.SNIPPET_NOT_FOUND(snippetId), 'SNIPPET_NOT_FOUND'));
  });

  it('should delete an existing snippet belonging to a user', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();

    const [snippet1, snippet2] = await Promise.all([
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
    ]);

    // WHEN
    const deleteSnippetInput = TestHelper.deleteTestSnippetInput({ snippetId: snippet1.id, userId: snippet1.userId });

    await snippetService.delete(deleteSnippetInput);

    // THEN
    const folderSnippets = await snippetService.findByFolder(rootFolder.id);

    expect(folderSnippets).toHaveLength(1);

    await testHelper.deleteTestSnippetsById([snippet2.id]);
    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should not delete an existing snippet because it belongs to other user', async () => {
    // GIVEN
    const [user1, rootFolder1] = await testHelper.createUserWithRootFolder();
    const [user2, rootFolder2] = await testHelper.createUserWithRootFolder();

    const [snippet1, snippet2, snippet3] = await Promise.all([
      testHelper.createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'public' }),
      testHelper.createTestSnippet({ folderId: rootFolder2.id, userId: user2.id, visibility: 'private' }),
      testHelper.createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'private' }),
    ]);

    // WHEN
    const deleteSnippetInput = TestHelper.deleteTestSnippetInput({ snippetId: snippet1.id, userId: user2.id });

    // THEN
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

  it('should update an existing snippet in the specified folder', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const snippet = await testHelper.createTestSnippet({
      folderId: rootFolder.id,
      userId: user.id,
      visibility: 'public',
    });

    const updateSnippetInput = TestHelper.updateTestSnippetInput({ snippetId: snippet.id, userId: user.id });

    // WHEN
    const updatedSnippet = await snippetService.update(updateSnippetInput);

    // THEN
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

  it('should not update an existing snippet in the specified folder because another snippet with the updated name already exists in the folder', async () => {
    // GIVEN
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

    // WHEN
    // THEN
    await expect(async () => {
      await snippetService.update(updateSnippetInput);
    }).rejects.toThrow(new AppError(errors.SNIPPET_ALREADY_EXIST(updateSnippetInput.name), 'SNIPPET_ALREADY_EXIST'));

    await testHelper.deleteTestSnippetsById([snippet.id]);
    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should not update an existing snippet in the specified folder because because it belongs to other user', async () => {
    // GIVEN
    const [user1, rootFolder1] = await testHelper.createUserWithRootFolder();
    const [user2, rootFolder2] = await testHelper.createUserWithRootFolder();
    const snippet = await testHelper.createTestSnippet({
      folderId: rootFolder1.id,
      name: 'snippet-one.java',
      userId: user1.id,
    });

    const updateSnippetInput = TestHelper.updateTestSnippetInput({ snippetId: snippet.id, userId: user2.id });

    // WHEN
    // THEN
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
