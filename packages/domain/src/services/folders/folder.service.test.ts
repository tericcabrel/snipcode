import { Test, TestingModule } from '@nestjs/testing';
import { SnipcodeError, errors, generateRandomId } from '@snipcode/utils';

import { Folder } from './folder.entity';
import { FolderService } from './folder.service';
import { CreateFolderInput } from './inputs/create-folder-input';
import { CreateUserRootFolderInput } from './inputs/create-user-root-folder-input';
import { TestHelper } from '../../../tests/helpers';
import { DomainModule } from '../../domain.module';
import { PrismaService } from '../../prisma.service';
import { RoleService } from '../roles/role.service';

describe('Test Folder service', () => {
  let folderService: FolderService;
  let roleService: RoleService;
  let testHelper: TestHelper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DomainModule.forRootAsync({
          databaseUrl: process.env.TEST_DATABASE_URL,
        }),
      ],
      providers: [RoleService, FolderService],
    }).compile();

    folderService = module.get<FolderService>(FolderService);
    roleService = module.get<RoleService>(RoleService);

    const prismaService = module.get<PrismaService>(PrismaService);

    testHelper = new TestHelper(prismaService);

    await roleService.loadRoles();
  });

  it('should create a root folder for a user', async () => {
    // GIVEN
    const user = await testHelper.createTestUser({});

    const creatUserRootFolderInput = new CreateUserRootFolderInput(user.id);

    // WHEN
    const expectedFolder = await folderService.createUserRootFolder(creatUserRootFolderInput);

    // THEN
    expect(expectedFolder?.id).toEqual(creatUserRootFolderInput.toFolder().id);

    await testHelper.deleteTestFoldersById([expectedFolder?.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should create folder for the specified user', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();

    const createFolderInput = new CreateFolderInput({
      name: 'my gist',
      parentId: rootFolder.id,
      userId: user.id,
    });

    // WHEN
    const expectedFolder = await folderService.create(createFolderInput);

    // THEN
    expect(expectedFolder).toMatchObject({
      id: createFolderInput.toFolder().id,
      isFavorite: false,
      name: createFolderInput.name,
      parentId: rootFolder.id,
      userId: user.id,
    });

    await testHelper.deleteTestFoldersById([expectedFolder.id]);
    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should not create the folder cause it already exists', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();

    const [firstFolder, secondFolder] = await testHelper.createManyTestFolders({
      folderNames: ['My gist', 'Blogs'],
      parentId: rootFolder.id,
      userId: user.id,
    });

    const createFolderInput = new CreateFolderInput({
      name: secondFolder.name,
      parentId: rootFolder.id,
      userId: user.id,
    });

    // WHEN
    // THEN
    await expect(() => folderService.create(createFolderInput)).rejects.toThrow(
      new SnipcodeError(errors.FOLDER_ALREADY_EXIST(createFolderInput.name), 'FOLDER_ALREADY_EXIST'),
    );

    await testHelper.deleteTestFoldersById([firstFolder.id, secondFolder.id, rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it("should find the user's root folder", async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();

    const [firstFolder, secondFolder] = await testHelper.createManyTestFolders({
      folderNames: ['My gist', 'Blogs'],
      parentId: rootFolder.id,
      userId: user.id,
    });

    // WHEN
    const userRootFolder = await folderService.findUserRootFolder(user.id);

    // THEN
    expect(userRootFolder?.name).toEqual(`__${user.id}__`);

    await testHelper.deleteTestFoldersById([firstFolder.id, secondFolder.id, rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it("should not find the user's root folder", async () => {
    // GIVEN
    const user = await testHelper.createTestUser({});

    // WHEN
    // THEN
    await expect(() => folderService.findUserRootFolder(user.id)).rejects.toThrow(
      new SnipcodeError(errors.USER_ROOT_FOLDER_NOT_FOUND(user.id), 'USER_ROOT_FOLDER_NOT_FOUND'),
    );

    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should find sub folders of the root user folder', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();

    const [gistFolder, blogsFolder] = await testHelper.createManyTestFolders({
      folderNames: ['My gist', 'Blogs'],
      parentId: rootFolder.id,
      userId: user.id,
    });

    const [post1Folder, post2folder] = await testHelper.createManyTestFolders({
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

    await testHelper.deleteTestFoldersById([
      post1Folder.id,
      post2folder.id,
      gistFolder.id,
      blogsFolder.id,
      rootFolder.id,
    ]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should find the sub folders of a folder', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();

    const [firstFolder, secondFolder] = await testHelper.createManyTestFolders({
      folderNames: ['My gist', 'Blogs'],
      parentId: rootFolder.id,
      userId: user.id,
    });

    const [javaFolder, nodeFolder] = await testHelper.createManyTestFolders({
      folderNames: ['java', 'node.js'],
      parentId: firstFolder.id,
      userId: user.id,
    });

    const [post1Folder, post2folder] = await testHelper.createManyTestFolders({
      folderNames: ['post1', 'post2'],
      parentId: secondFolder.id,
      userId: user.id,
    });

    // WHEN
    const subFolders = await folderService.findSubFolders(user.id, firstFolder.id);

    // THEN
    expect(subFolders).toHaveLength(2);
    expect(subFolders.map((folder) => folder.name)).toEqual(['java', 'node.js']);

    await testHelper.deleteTestFoldersById([
      javaFolder.id,
      nodeFolder.id,
      post1Folder.id,
      post2folder.id,
      firstFolder.id,
      secondFolder.id,
      rootFolder.id,
    ]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should delete folders belonging to the user', async () => {
    // GIVEN
    const [user1, rootFolder1] = await testHelper.createUserWithRootFolder();
    const [myGistFolder, blogsFolder] = await testHelper.createManyTestFolders({
      folderNames: ['My gist', 'Blogs'],
      parentId: rootFolder1.id,
      userId: user1.id,
    });

    const [user2, rootFolder2] = await testHelper.createUserWithRootFolder();
    const [projectFolder, snippetFolder] = await testHelper.createManyTestFolders({
      folderNames: ['project', 'snippet'],
      parentId: rootFolder2.id,
      userId: user2.id,
    });

    // WHEN
    await folderService.deleteMany([myGistFolder.id, blogsFolder.id], user1.id);
    const subFolders = await folderService.findSubFolders(user1.id);

    // THEN
    expect(subFolders).toHaveLength(0);

    await testHelper.deleteTestFoldersById([projectFolder.id, snippetFolder.id, rootFolder1.id, rootFolder2.id]);
    await testHelper.deleteTestUsersById([user1.id]);
    await testHelper.deleteTestUsersById([user2.id]);
  });

  it('should delete folders belonging to the user - validation check', async () => {
    // GIVEN
    const [user1, rootFolder1] = await testHelper.createUserWithRootFolder();
    const [myGistFolder, blogsFolder] = await testHelper.createManyTestFolders({
      folderNames: ['My gist', 'Blogs'],
      parentId: rootFolder1.id,
      userId: user1.id,
    });

    const [user2, rootFolder2] = await testHelper.createUserWithRootFolder();
    const [projectFolder, snippetFolder] = await testHelper.createManyTestFolders({
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

    await testHelper.deleteTestFoldersById([
      snippetFolder.id,
      projectFolder.id,
      blogsFolder.id,
      rootFolder1.id,
      rootFolder2.id,
    ]);
    await testHelper.deleteTestUsersById([user1.id]);
    await testHelper.deleteTestUsersById([user2.id]);
  });

  it('should not delete folders because we cannot delete a root folder', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const [myGistFolder] = await testHelper.createManyTestFolders({
      folderNames: ['My gist'],
      parentId: rootFolder.id,
      userId: user.id,
    });

    // WHEN
    // THEN
    await expect(async () => {
      await folderService.deleteMany([myGistFolder.id, rootFolder.id], user.id);
    }).rejects.toThrow(new SnipcodeError(errors.CANT_DELETE_ROOT_FOLDER, 'CANT_DELETE_ROOT_FOLDER'));

    await testHelper.deleteTestFoldersById([myGistFolder.id, rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should generate the breadcrumb path of a folder', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();

    const gistFolderInput = TestHelper.createTestFolderInput({
      name: 'My gist',
      parentId: rootFolder.id,
      userId: user.id,
    });
    const gistFolder = await folderService.create(gistFolderInput);

    const nodeFolderInput = TestHelper.createTestFolderInput({
      name: 'Node.js',
      parentId: gistFolder.id,
      userId: user.id,
    });
    const nodeFolder = await folderService.create(nodeFolderInput);

    // WHEN
    const subFolders = await folderService.generateBreadcrumb(nodeFolder.id);

    // THEN
    expect(subFolders).toHaveLength(2);
    expect(subFolders.map((folder) => folder.name)).toEqual(['My gist', 'Node.js']);

    await testHelper.deleteTestFoldersById([nodeFolder.id, gistFolder.id, rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should generate the breadcrumb path of the root folder', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();

    // WHEN
    const subFolders = await folderService.generateBreadcrumb(rootFolder.id);

    // THEN
    expect(subFolders).toHaveLength(0);

    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
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
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const [folder] = await testHelper.createManyTestFolders({
      folderNames: ['My gist'],
      parentId: rootFolder.id,
      userId: user.id,
    });

    const updateFolderInput = TestHelper.updateTestFolderInput({
      folderId: folder.id,
      name: 'The Gist',
      userId: user.id,
    });

    // WHEN
    const updatedFolder = await folderService.update(updateFolderInput);

    // THEN
    const folderToUpdate = updateFolderInput.toFolder(folder);

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

    await testHelper.deleteTestFoldersById([updatedFolder.id, rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should not update an existing folder in the specified folder because another folder with the updated name already exists in the folder', async () => {
    // GIVEN
    const [user, rootFolder] = await testHelper.createUserWithRootFolder();
    const [folder1, folder2] = await testHelper.createManyTestFolders({
      folderNames: ['folder-one', 'folder-two'],
      parentId: rootFolder.id,
      userId: user.id,
    });

    const updateFolderInput = TestHelper.updateTestFolderInput({
      folderId: folder1.id,
      name: 'folder-two',
      userId: user.id,
    });

    // WHEN
    // THEN
    await expect(async () => {
      await folderService.update(updateFolderInput);
    }).rejects.toThrow(new SnipcodeError(errors.FOLDER_ALREADY_EXIST(updateFolderInput.name), 'FOLDER_ALREADY_EXIST'));

    await testHelper.deleteTestFoldersById([folder1.id, folder2.id]);
    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should not update an existing folder in the specified folder because it belongs to other user', async () => {
    // GIVEN
    const [user1, rootFolder1] = await testHelper.createUserWithRootFolder();
    const [user2, rootFolder2] = await testHelper.createUserWithRootFolder();
    const [folderUser2] = await testHelper.createManyTestFolders({
      folderNames: ['folder-user-two'],
      parentId: rootFolder2.id,
      userId: user2.id,
    });

    const updateFolderInput = TestHelper.updateTestFolderInput({ folderId: folderUser2.id, userId: user1.id });

    // WHEN
    // THEN
    await expect(async () => {
      await folderService.update(updateFolderInput);
    }).rejects.toThrow(
      new SnipcodeError(errors.CANT_EDIT_FOLDER(updateFolderInput.creatorId, folderUser2.id), 'CANT_EDIT_FOLDER'),
    );

    await testHelper.deleteTestFoldersById([folderUser2.id]);
    await testHelper.deleteTestFoldersById([rootFolder1.id, rootFolder2.id]);
    await testHelper.deleteTestUsersById([user1.id, user2.id]);
  });

  it('should not update the user root folder', async () => {
    // GIVEN
    const [user1, rootFolder] = await testHelper.createUserWithRootFolder();

    const updateFolderInput = TestHelper.updateTestFolderInput({
      folderId: rootFolder.id,
      name: 'new-root-folder',
      userId: user1.id,
    });

    // WHEN
    // THEN
    await expect(async () => {
      await folderService.update(updateFolderInput);
    }).rejects.toThrow(new SnipcodeError(errors.CANT_RENAME_ROOT_FOLDER, 'CANT_RENAME_ROOT_FOLDER'));

    await testHelper.deleteTestFoldersById([rootFolder.id]);
    await testHelper.deleteTestUsersById([user1.id]);
  });
});
