import { Snippet } from '@sharingan/database';
import SharinganError, { errors } from '@sharingan/utils';

import { roleService, snippetService } from '../../../index';
import {
  createTestSnippet,
  createTestSnippetDto,
  createUserWithRootFolder,
  deleteTestFoldersById,
  deleteTestSnippetsById,
  deleteTestUsersById,
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
      new SharinganError(errors.SNIPPET_ALREADY_EXIST(sameCreateSnippetDto.name), 'SNIPPET_ALREADY_EXIST'),
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

  it('should find all snippets of a folder', async () => {
    // GIVEN
    const [user1, rootFolder1] = await createUserWithRootFolder();
    const [user2, rootFolder2] = await createUserWithRootFolder();

    const existingSnippets = await Promise.all([
      createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'public' }),
      createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'private' }),
      createTestSnippet({ folderId: rootFolder2.id, userId: user2.id, visibility: 'public' }),
      createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'private' }),
      createTestSnippet({ folderId: rootFolder2.id, userId: user2.id, visibility: 'public' }),
      createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'private' }),
      createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'private' }),
      createTestSnippet({ folderId: rootFolder1.id, userId: user1.id, visibility: 'private' }),
    ]);

    // WHEN
    const folderSnippets = await snippetService.findByFolder(rootFolder1.id);

    // THEN
    await expect(folderSnippets).toHaveLength(6);

    await deleteTestSnippetsById(existingSnippets.map((snippet) => snippet.id));
    await deleteTestFoldersById([rootFolder1.id, rootFolder2.id]);
    await deleteTestUsersById([user1.id, user2.id]);
  });
});
