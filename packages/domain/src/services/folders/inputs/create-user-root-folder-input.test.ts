import { CreateUserRootFolderInput } from './create-user-root-folder-input';
import { Folder } from '../folder.entity';

describe('Test Create User Root Folder Input', () => {
  it('should create a valid folder object', () => {
    const input = new CreateUserRootFolderInput('dm34saxf6111113dabfed9tmm');

    const folder = input.toFolder();

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
