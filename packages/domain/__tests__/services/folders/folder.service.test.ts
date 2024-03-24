import { Folder } from '@snipcode/database';
import SnipcodeError, { errors, generateRandomId } from '@snipcode/utils';

import { CreateUserRootFolderDto, folderService, roleService } from '../../../index';
import CreateFolderDto from '../../../src/folders/dtos/create-folder-dto';
import {
  createManyTestFolders,
  createTestFolderDto,
  createTestUser,
  createUserWithRootFolder,
  deleteTestFoldersById,
  deleteTestUsersById,
  updateTestFolderDto,
} from '../../setup/test-utils';

describe('Test Folder service', () => {
  beforeAll(async () => {
    await roleService.loadRoles();
  });

  it('should create a root folder for a user', async () => {
    // GIVEN
    const user = await createTestUser({});

    const creatUserRootFolderDto = new CreateUserRootFolderDto(user.id);

    // WHEN
    const expectedFolder = await folderService.createUserRootFolder(creatUserRootFolderDto);

    // THEN
    expect(expectedFolder?.id).toEqual(creatUserRootFolderDto.toFolder().id);

    await deleteTestFoldersById([expectedFolder?.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should create folder for the specified user', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();

    const createFolderDto = new CreateFolderDto({
      name: 'my gist',
      parentId: rootFolder.id,
      userId: user.id,
    });

    // WHEN
    const expectedFolder = await folderService.create(createFolderDto);

    // THEN
    expect(expectedFolder).toMatchObject({
      id: createFolderDto.toFolder().id,
      isFavorite: false,
      name: createFolderDto.name,
      parentId: rootFolder.id,
      userId: user.id,
    });

    await deleteTestFoldersById([expectedFolder.id]);
    await deleteTestFoldersById([rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should not create the folder cause it already exists', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();

    const [firstFolder, secondFolder] = await createManyTestFolders({
      folderNames: ['My gist', 'Blogs'],
      parentId: rootFolder.id,
      userId: user.id,
    });

    const createFolderDto = new CreateFolderDto({
      name: secondFolder.name,
      parentId: rootFolder.id,
      userId: user.id,
    });

    // WHEN
    // THEN
    await expect(() => folderService.create(createFolderDto)).rejects.toThrow(
      new SnipcodeError(errors.FOLDER_ALREADY_EXIST(createFolderDto.name), 'FOLDER_ALREADY_EXIST'),
    );

    await deleteTestFoldersById([firstFolder.id, secondFolder.id, rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it("should find the user's root folder", async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();

    const [firstFolder, secondFolder] = await createManyTestFolders({
      folderNames: ['My gist', 'Blogs'],
      parentId: rootFolder.id,
      userId: user.id,
    });

    // WHEN
    const userRootFolder = await folderService.findUserRootFolder(user.id);

    // THEN
    expect(userRootFolder?.name).toEqual(`__${user.id}__`);

    await deleteTestFoldersById([firstFolder.id, secondFolder.id, rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it("should not find the user's root folder", async () => {
    // GIVEN
    const user = await createTestUser({});

    // WHEN
    // THEN
    await expect(() => folderService.findUserRootFolder(user.id)).rejects.toThrow(
      new SnipcodeError(errors.USER_ROOT_FOLDER_NOT_FOUND(user.id), 'USER_ROOT_FOLDER_NOT_FOUND'),
    );

    await deleteTestUsersById([user.id]);
  });

  it('should find sub folders of the root user folder', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();

    const [gistFolder, blogsFolder] = await createManyTestFolders({
      folderNames: ['My gist', 'Blogs'],
      parentId: rootFolder.id,
      userId: user.id,
    });

    const [post1Folder, post2folder] = await createManyTestFolders({
      folderNames: ['post1', 'post2'],
      parentId: blogsFolder.id,
      userId: user.id,
    });

    // WHEN
    const userRootFolders1 = await folderService.findSubFolders(user.id);
    const userRootFolders2 = await folderService.findSubFolders(user.id, rootFolder.id);

    // THEN
    expect(userRootFolders1).toHaveLength(2);
    expect(userRootFolders1).toEqual(userRootFolders2);

    await deleteTestFoldersById([post1Folder.id, post2folder.id, gistFolder.id, blogsFolder.id, rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should find the sub folders of a folder', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();

    const [firstFolder, secondFolder] = await createManyTestFolders({
      folderNames: ['My gist', 'Blogs'],
      parentId: rootFolder.id,
      userId: user.id,
    });

    const [javaFolder, nodeFolder] = await createManyTestFolders({
      folderNames: ['java', 'node.js'],
      parentId: firstFolder.id,
      userId: user.id,
    });

    const [post1Folder, post2folder] = await createManyTestFolders({
      folderNames: ['post1', 'post2'],
      parentId: secondFolder.id,
      userId: user.id,
    });

    // WHEN
    const subFolders = await folderService.findSubFolders(user.id, firstFolder.id);

    // THEN
    expect(subFolders).toHaveLength(2);
    expect(subFolders.map((folder) => folder.name)).toEqual(['java', 'node.js']);

    await deleteTestFoldersById([
      javaFolder.id,
      nodeFolder.id,
      post1Folder.id,
      post2folder.id,
      firstFolder.id,
      secondFolder.id,
      rootFolder.id,
    ]);
    await deleteTestUsersById([user.id]);
  });

  it('should delete folders belonging to the user', async () => {
    // GIVEN
    const [user1, rootFolder1] = await createUserWithRootFolder();
    const [myGistFolder, blogsFolder] = await createManyTestFolders({
      folderNames: ['My gist', 'Blogs'],
      parentId: rootFolder1.id,
      userId: user1.id,
    });

    const [user2, rootFolder2] = await createUserWithRootFolder();
    const [projectFolder, snippetFolder] = await createManyTestFolders({
      folderNames: ['project', 'snippet'],
      parentId: rootFolder2.id,
      userId: user2.id,
    });

    // WHEN
    await folderService.deleteMany([myGistFolder.id, blogsFolder.id], user1.id);
    const subFolders = await folderService.findSubFolders(user1.id);

    // THEN
    expect(subFolders).toHaveLength(0);

    await deleteTestFoldersById([projectFolder.id, snippetFolder.id, rootFolder1.id, rootFolder2.id]);
    await deleteTestUsersById([user1.id]);
    await deleteTestUsersById([user2.id]);
  });

  it('should delete folders belonging to the user - validation check', async () => {
    // GIVEN
    const [user1, rootFolder1] = await createUserWithRootFolder();
    const [myGistFolder, blogsFolder] = await createManyTestFolders({
      folderNames: ['My gist', 'Blogs'],
      parentId: rootFolder1.id,
      userId: user1.id,
    });

    const [user2, rootFolder2] = await createUserWithRootFolder();
    const [projectFolder, snippetFolder] = await createManyTestFolders({
      folderNames: ['project', 'snippet'],
      parentId: rootFolder2.id,
      userId: user2.id,
    });

    // WHEN
    await folderService.deleteMany([myGistFolder.id, projectFolder.id], user1.id);

    // THEN
    const user1SubFolders = await folderService.findSubFolders(user1.id);
    const user2SubFolders = await folderService.findSubFolders(user2.id);

    expect(user1SubFolders).toHaveLength(1);
    expect(user1SubFolders.map((folder) => folder.name)).toEqual(['Blogs']);

    expect(user2SubFolders).toHaveLength(2);
    expect(user2SubFolders.map((folder) => folder.name)).toEqual(['project', 'snippet']);

    await deleteTestFoldersById([snippetFolder.id, projectFolder.id, blogsFolder.id, rootFolder1.id, rootFolder2.id]);
    await deleteTestUsersById([user1.id]);
    await deleteTestUsersById([user2.id]);
  });

  it('should not delete folders because we cannot delete a root folder', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();
    const [myGistFolder] = await createManyTestFolders({
      folderNames: ['My gist'],
      parentId: rootFolder.id,
      userId: user.id,
    });

    // WHEN
    // THEN
    await expect(async () => {
      await folderService.deleteMany([myGistFolder.id, rootFolder.id], user.id);
    }).rejects.toThrow(new SnipcodeError(errors.CANT_DELETE_ROOT_FOLDER, 'CANT_DELETE_ROOT_FOLDER'));

    await deleteTestFoldersById([myGistFolder.id, rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should generate the breadcrumb path of a folder', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();

    const gistFolderDto = createTestFolderDto({
      name: 'My gist',
      parentId: rootFolder.id,
      userId: user.id,
    });
    const gistFolder = await folderService.create(gistFolderDto);

    const nodeFolderDto = createTestFolderDto({
      name: 'Node.js',
      parentId: gistFolder.id,
      userId: user.id,
    });
    const nodeFolder = await folderService.create(nodeFolderDto);

    // WHEN
    const subFolders = await folderService.generateBreadcrumb(nodeFolder.id);

    // THEN
    expect(subFolders).toHaveLength(2);
    expect(subFolders.map((folder) => folder.name)).toEqual(['My gist', 'Node.js']);

    await deleteTestFoldersById([nodeFolder.id, gistFolder.id, rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should generate the breadcrumb path of the root folder', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();

    // WHEN
    const subFolders = await folderService.generateBreadcrumb(rootFolder.id);

    // THEN
    expect(subFolders).toHaveLength(0);

    await deleteTestFoldersById([rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should found no folder given the ID provided', async () => {
    // GIVEN
    const folderId = generateRandomId();

    // WHEN
    // THEN
    await expect(async () => {
      await folderService.findById(folderId);
    }).rejects.toThrow(new SnipcodeError(errors.FOLDER_NOT_FOUND(folderId), 'FOLDER_NOT_FOUND'));
  });

  it('should update an existing folder in the specified folder', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();
    const [folder] = await createManyTestFolders({
      folderNames: ['My gist'],
      parentId: rootFolder.id,
      userId: user.id,
    });

    const updateFolderDto = updateTestFolderDto({ folderId: folder.id, name: 'The Gist', userId: user.id });

    // WHEN
    const updatedFolder = await folderService.update(updateFolderDto);

    // THEN
    const folderToUpdate = updateFolderDto.toFolder(folder);

    expect(updatedFolder).toMatchObject<Folder>({
      createdAt: expect.any(Date),
      id: folder.id,
      isFavorite: false,
      name: folderToUpdate.name,
      parentId: rootFolder.id,
      path: folder.path,
      updatedAt: expect.any(Date),
      userId: user.id,
    });

    await deleteTestFoldersById([updatedFolder.id, rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should not update an existing folder in the specified folder because another folder with the updated name already exists in the folder', async () => {
    // GIVEN
    const [user, rootFolder] = await createUserWithRootFolder();
    const [folder1, folder2] = await createManyTestFolders({
      folderNames: ['folder-one', 'folder-two'],
      parentId: rootFolder.id,
      userId: user.id,
    });

    const updateFolderDto = updateTestFolderDto({ folderId: folder1.id, name: 'folder-two', userId: user.id });

    // WHEN
    // THEN
    await expect(async () => {
      await folderService.update(updateFolderDto);
    }).rejects.toThrow(new SnipcodeError(errors.FOLDER_ALREADY_EXIST(updateFolderDto.name), 'FOLDER_ALREADY_EXIST'));

    await deleteTestFoldersById([folder1.id, folder2.id]);
    await deleteTestFoldersById([rootFolder.id]);
    await deleteTestUsersById([user.id]);
  });

  it('should not update an existing folder in the specified folder because it belongs to other user', async () => {
    // GIVEN
    const [user1, rootFolder1] = await createUserWithRootFolder();
    const [user2, rootFolder2] = await createUserWithRootFolder();
    const [folderUser2] = await createManyTestFolders({
      folderNames: ['folder-user-two'],
      parentId: rootFolder2.id,
      userId: user2.id,
    });

    const updateFolderDto = updateTestFolderDto({ folderId: folderUser2.id, userId: user1.id });

    // WHEN
    // THEN
    await expect(async () => {
      await folderService.update(updateFolderDto);
    }).rejects.toThrow(
      new SnipcodeError(errors.CANT_EDIT_FOLDER(updateFolderDto.creatorId, folderUser2.id), 'CANT_EDIT_FOLDER'),
    );

    await deleteTestFoldersById([folderUser2.id]);
    await deleteTestFoldersById([rootFolder1.id, rootFolder2.id]);
    await deleteTestUsersById([user1.id, user2.id]);
  });

  it('should not update the user root folder', async () => {
    // GIVEN
    const [user1, rootFolder] = await createUserWithRootFolder();

    const updateFolderDto = updateTestFolderDto({ folderId: rootFolder.id, name: 'new-root-folder', userId: user1.id });

    // WHEN
    // THEN
    await expect(async () => {
      await folderService.update(updateFolderDto);
    }).rejects.toThrow(new SnipcodeError(errors.CANT_RENAME_ROOT_FOLDER, 'CANT_RENAME_ROOT_FOLDER'));

    await deleteTestFoldersById([rootFolder.id]);
    await deleteTestUsersById([user1.id]);
  });
});
