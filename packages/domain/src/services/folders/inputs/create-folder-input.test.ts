import { CreateFolderInput } from './create-folder-input';
import { Folder } from '../folder.entity';

describe('Test Create Folder Input', () => {
  it('should create a valid folder object', () => {
    // GIVEN
    const input = new CreateFolderInput({
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      userId: 'dm34saxf6111113dabfed9tmm',
    });

    // WHEN
    const folder = input.toFolder();

    // THEN
    expect(folder).toMatchObject<Folder>({
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
    // GIVEN
    const input = new CreateFolderInput({
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      userId: 'dm34saxf6111113dabfed9tmm',
    });
    const expectedFolderName = 'blogs';

    // WHEN
    // THEN
    expect(input.name).toEqual(expectedFolderName);
  });

  it('should create the valid folder parent id', () => {
    // GIVEN
    const input = new CreateFolderInput({
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      userId: 'dm34saxf6111113dabfed9tmm',
    });
    const expectedParentId = 'cl23rzwe5000002czaedc8sll';

    // WHEN
    // THEN
    expect(input.parentFolderId).toEqual(expectedParentId);
  });

  it('should create the valid folder user id', () => {
    // GIVEN
    const input = new CreateFolderInput({
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      userId: 'dm34saxf6111113dabfed9tmm',
    });
    const expectedUserId = 'dm34saxf6111113dabfed9tmm';

    // WHEN
    // THEN
    expect(input.user).toEqual(expectedUserId);
  });
});
