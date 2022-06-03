import { folderService, roleService } from '../../../index';
import CreateUserRootFolderDto from '../../../src/folders/dtos/create-user-root-folder-dto';
import { createTestUser, deleteTestFolderById, deleteTestUser } from '../../setup/test-utils';

describe('Test Folder service', () => {
  beforeAll(async () => {
    await roleService.loadRoles();
  });

  it('should create a root folder for a user', async () => {
    // GIVEN
    const user = await createTestUser();

    const creatUserRootFolderDto = new CreateUserRootFolderDto(user.id);

    // WHEN
    await folderService.createUserRootFolder(creatUserRootFolderDto);
    const expectedFolder = await folderService.findUserRootFolder(user.id);

    // THEN
    expect(expectedFolder?.id).toEqual(creatUserRootFolderDto.toFolder().id);

    await deleteTestFolderById(expectedFolder?.id);
    await deleteTestUser(user);
  });
});
