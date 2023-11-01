import { Snippet } from '@snipcode/database';
import SnipcodeError, { errors, generateRandomId } from '@snipcode/utils';

import { roleService, snippetService } from '../../../index';
import {
  createTestSnippet,
  createTestSnippetDto,
  createUserWithRootFolder,
  deleteTestFoldersById,
  deleteTestSnippetDto,
  deleteTestSnippetsById,
  deleteTestUsersById,
  updateTestSnippetDto,
} from '../../setup/test-utils';

describe('Test Snippet service', () => {
  beforeAll(async () => {
    await roleService.loadRoles();
  });

  it('should create a snippet in the specified folder', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();
    const createSnippetDto = createTestSnippetDto({ folderId: rootFolder.id, userId: user.id });

    // WHEN
    const expectedSnippet = await snippetService.create(createSnippetDto);

    // THEN
    expect(expectedSnippet).toMatchObject<Snippet>({
      content: createSnippetDto.toSnippet().content,
      contentHtml: createSnippetDto.toSnippet().contentHtml,
      createdAt: expect.any(Date),
      description: createSnippetDto.toSnippet().description,
      folderId: rootFolder.id,
      id: createSnippetDto.toSnippet().id,
      language: createSnippetDto.toSnippet().language,
      lineHighlight: createSnippetDto.toSnippet().lineHighlight,
      name: createSnippetDto.toSnippet().name,
      size: createSnippetDto.toSnippet().size,
      theme: createSnippetDto.toSnippet().theme,
      updatedAt: expect.any(Date),
      userId: user.id,
      visibility: createSnippetDto.toSnippet().visibility,
    });

    await deleteTestSnippetsById([expectedSnippet.id]);
    await deleteTestFoldersById([rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should not create a snippet because it already exists in the specified folder', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();
    const snippet = await createTestSnippet({ folderId: rootFolder.id, name: 'app.tsx', userId: user.id });

    const sameCreateSnippetDto = createTestSnippetDto({ folderId: rootFolder.id, name: 'app.tsx', userId: user.id });

    // WHEN
    // THEN
    await expect(() => snippetService.create(sameCreateSnippetDto)).rejects.toThrow(
      new SnipcodeError(errors.SNIPPET_ALREADY_EXIST(sameCreateSnippetDto.name), 'SNIPPET_ALREADY_EXIST'),
    );

    await deleteTestSnippetsById([snippet.id]);
    await deleteTestFoldersById([rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should retrieve all public snippets', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();
    const existingSnippets = await Promise.all([
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
    ]);

    // WHEN
    const publicSnippets = await snippetService.findPublicSnippet({ itemPerPage: 10 });

    // THEN
    await expect(publicSnippets.hasMore).toEqual(false);
    await expect(publicSnippets.nextCursor).toEqual(null);
    await expect(publicSnippets.items).toHaveLength(4);

    await deleteTestSnippetsById(existingSnippets.map((snippet) => snippet.id));
    await deleteTestFoldersById([rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should retrieve a subset of public snippets', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();
    const existingSnippets = await Promise.all([
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
    ]);

    // WHEN
    const publicSnippets = await snippetService.findPublicSnippet({ itemPerPage: 3 });

    // THEN
    await expect(publicSnippets.hasMore).toEqual(true);
    await expect(publicSnippets.nextCursor).toEqual(expect.any(String));
    await expect(publicSnippets.items).toHaveLength(3);

    await deleteTestSnippetsById(existingSnippets.map((snippet) => snippet.id));
    await deleteTestFoldersById([rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should find all snippets of a user', async () => {
    // GIVEN
    const [user1, rootFolder1] = await createUserWithRootFolder();
    const [user2, rootFolder2] = await createUserWithRootFolder();

    const existingSnippets = await Promise.all([
      createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'public' }),
      createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'private' }),
      createTestSnippet({ folderId: rootFolder2.id, userId: user2.id, visibility: 'public' }),
      createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'private' }),
      createTestSnippet({ folderId: rootFolder2.id, userId: user2.id, visibility: 'public' }),
      createTestSnippet({ folderId: rootFolder2.id, userId: user2.id, visibility: 'private' }),
    ]);

    // WHEN
    const userSnippets = await snippetService.findByUser(user2.id);

    // THEN
    await expect(userSnippets).toHaveLength(3);

    await deleteTestSnippetsById(existingSnippets.map((snippet) => snippet.id));
    await deleteTestFoldersById([rootFolder1.id, rootFolder2.id]);
    await deleteTestUsersById([user1.id, user2.id]);
  });

  it('should retrieve a snippet by its ID', async () => {
    // GIVEN
    const [user1, rootFolder1] = await createUserWithRootFolder();

    const [snippet] = await Promise.all([
      createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'public' }),
    ]);

    // WHEN
    const snippetFound = await snippetService.findById(snippet.id);

    // THEN
    expect(snippetFound).toMatchObject({
      folderId: rootFolder1.id,
      id: snippet.id,
      userId: user1.id,
      visibility: 'public',
    });

    await deleteTestSnippetsById([snippet.id]);
    await deleteTestFoldersById([rootFolder1.id]);
    await deleteTestUsersById([user1.id]);
  });

  it('should found no snippet given the ID provided', async () => {
    // GIVEN
    const snippetId = generateRandomId();

    // WHEN
    // THEN
    await expect(async () => {
      await snippetService.findById(snippetId);
    }).rejects.toThrow(new SnipcodeError(errors.SNIPPET_NOT_FOUND(snippetId), 'SNIPPET_NOT_FOUND'));
  });

  it('should delete an existing snippet belonging to a user', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();

    const [snippet1, snippet2] = await Promise.all([
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'private' }),
    ]);

    // WHEN
    const deleteSnippetDto = deleteTestSnippetDto({ snippetId: snippet1.id, userId: snippet1.userId });

    await snippetService.delete(deleteSnippetDto);

    // THEN
    const folderSnippets = await snippetService.findByFolder(rootFolder.id);

    expect(folderSnippets).toHaveLength(1);

    await deleteTestSnippetsById([snippet2.id]);
    await deleteTestFoldersById([rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should not delete an existing snippet because it belongs to other user', async () => {
    // GIVEN
    const [user1, rootFolder1] = await createUserWithRootFolder();
    const [user2, rootFolder2] = await createUserWithRootFolder();

    const [snippet1, snippet2, snippet3] = await Promise.all([
      createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'public' }),
      createTestSnippet({ folderId: rootFolder2.id, userId: user2.id, visibility: 'private' }),
      createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'private' }),
    ]);

    // WHEN
    const deleteSnippetDto = deleteTestSnippetDto({ snippetId: snippet1.id, userId: user2.id });

    // THEN
    await expect(async () => {
      await snippetService.delete(deleteSnippetDto);
    }).rejects.toThrow(
      new SnipcodeError(errors.CANT_EDIT_SNIPPET(deleteSnippetDto.creatorId, snippet1.id), 'CANT_EDIT_SNIPPET'),
    );

    const user1FolderSnippets = await snippetService.findByFolder(rootFolder1.id);
    const user2FolderSnippets = await snippetService.findByFolder(rootFolder2.id);

    expect(user1FolderSnippets).toHaveLength(2);
    expect(user2FolderSnippets).toHaveLength(1);

    await deleteTestSnippetsById([snippet2.id, snippet3.id]);
    await deleteTestFoldersById([rootFolder1.id, rootFolder2.id]);
    await deleteTestUsersById([user1.id, user2.id]);
  });

  it('should update an existing snippet in the specified folder', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();
    const [snippet] = await Promise.all([
      createTestSnippet({ folderId: rootFolder.id, userId: user.id, visibility: 'public' }),
    ]);

    const updateSnippetDto = updateTestSnippetDto({ snippetId: snippet.id, userId: user.id });

    // WHEN
    const updatedSnippet = await snippetService.update(updateSnippetDto);

    // THEN
    const snippetToUpdate = updateSnippetDto.toSnippet(snippet);

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

    await deleteTestSnippetsById([updatedSnippet.id]);
    await deleteTestFoldersById([rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should not update an existing snippet in the specified folder because another snippet with the updated name already exists in the folder', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();
    const [snippet] = await Promise.all([
      createTestSnippet({ folderId: rootFolder.id, name: 'snippet-one.java', userId: user.id }),
      createTestSnippet({ folderId: rootFolder.id, name: 'snippet-two.java', userId: user.id, visibility: 'private' }),
    ]);

    const updateSnippetDto = updateTestSnippetDto({ name: 'snippet-two.java', snippetId: snippet.id, userId: user.id });

    // WHEN
    // THEN
    await expect(async () => {
      await snippetService.update(updateSnippetDto);
    }).rejects.toThrow(new SnipcodeError(errors.SNIPPET_ALREADY_EXIST(updateSnippetDto.name), 'SNIPPET_ALREADY_EXIST'));

    await deleteTestSnippetsById([snippet.id]);
    await deleteTestFoldersById([rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should not update an existing snippet in the specified folder because because it belongs to other user', async () => {
    // GIVEN
    const [user1, rootFolder1] = await createUserWithRootFolder();
    const [user2, rootFolder2] = await createUserWithRootFolder();
    const [snippet] = await Promise.all([
      createTestSnippet({ folderId: rootFolder1.id, name: 'snippet-one.java', userId: user1.id }),
    ]);

    const updateSnippetDto = updateTestSnippetDto({ snippetId: snippet.id, userId: user2.id });

    // WHEN
    // THEN
    await expect(async () => {
      await snippetService.update(updateSnippetDto);
    }).rejects.toThrow(
      new SnipcodeError(errors.CANT_EDIT_SNIPPET(updateSnippetDto.creatorId, snippet.id), 'CANT_EDIT_SNIPPET'),
    );

    await deleteTestSnippetsById([snippet.id]);
    await deleteTestFoldersById([rootFolder1.id, rootFolder2.id]);
    await deleteTestUsersById([user1.id, user2.id]);
  });
});
