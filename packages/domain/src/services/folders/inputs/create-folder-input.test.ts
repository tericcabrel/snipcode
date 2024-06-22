import { CreateFolderInput } from './create-folder-input';
import { Folder } from '../folder.entity';

describe('Test Create Folder Input', () => {
  it('should create a valid folder object', () => {
    const input = new CreateFolderInput({
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      userId: 'dm34saxf6111113dabfed9tmm',
    });

    const folder = input.toFolder();

    expect(folder).toMatchObject<Folder>({
      category: 'visible',
      createdAt: expect.any(Date),
      id: expect.any(String),
      isFavorite: false,
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      path: null,
      updatedAt: expect.any(Date),
      userId: 'dm34saxf6111113dabfed9tmm',
    });
  });

  it('should create the valid folder name', () => {
    const input = new CreateFolderInput({
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      userId: 'dm34saxf6111113dabfed9tmm',
    });
    const expectedFolderName = 'blogs';

    expect(input.name).toEqual(expectedFolderName);
  });

  it('should create the valid folder parent id', () => {
    const input = new CreateFolderInput({
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      userId: 'dm34saxf6111113dabfed9tmm',
    });
    const expectedParentId = 'cl23rzwe5000002czaedc8sll';

    expect(input.parentFolderId).toEqual(expectedParentId);
  });

  it('should create the valid folder user id', () => {
    const input = new CreateFolderInput({
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      userId: 'dm34saxf6111113dabfed9tmm',
    });
    const expectedUserId = 'dm34saxf6111113dabfed9tmm';

    expect(input.user).toEqual(expectedUserId);
  });
});
