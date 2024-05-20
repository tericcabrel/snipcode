import { CreateUserRootFolderDto } from './create-user-root-folder-dto';
import { Folder } from '../../entities/folder';

describe('Test Create User Root Folder DTO', () => {
  it('should create a valid folder object', () => {
    const dto = new CreateUserRootFolderDto('dm34saxf6111113dabfed9tmm');

    const folder = dto.toFolder();

    expect(folder).toMatchObject<Folder>({
      createdAt: expect.any(Date),
      id: expect.any(String),
      isFavorite: false,
      name: '__dm34saxf6111113dabfed9tmm__',
      parentId: null,
      path: null,
      updatedAt: expect.any(Date),
      userId: 'dm34saxf6111113dabfed9tmm',
    });
  });
});
