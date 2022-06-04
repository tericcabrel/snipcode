import SharinganError, { errors } from '@sharingan/utils';

import { folderService, roleService } from '../../../index';
import { CreateUserRootFolderDto } from '../../../index';
import CreateFolderDto from '../../../src/folders/dtos/create-folder-dto';
import {
  createManyTestFolders,
  createTestUser,
  createUserWithRootFolder,
  deleteTestFoldersById,
  deleteTestUser,
} from '../../setup/test-utils';

describe('Test Folder service', () => {
  beforeAll(async () => {
    await roleService.loadRoles();
  });

  it('should create a root folder for a user', async () => {
    // GIVEN
    const user = await createTestUser();

    const creatUserRootFolderDto = new CreateUserRootFolderDto(user.id);

    // WHEN
    const expectedFolder = await folderService.createUserRootFolder(creatUserRootFolderDto);

    // THEN
    expect(expectedFolder?.id).toEqual(creatUserRootFolderDto.toFolder().id);

    await deleteTestFoldersById([expectedFolder?.id]);
    await deleteTestUser(user);
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
    await deleteTestUser(user);
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
      new SharinganError(errors.FOLDER_ALREADY_EXIST(createFolderDto.name), 'FOLDER_ALREADY_EXIST'),
    );

    await deleteTestFoldersById([firstFolder.id, secondFolder.id, rootFolder.id]);
    await deleteTestUser(user);
  });
});
