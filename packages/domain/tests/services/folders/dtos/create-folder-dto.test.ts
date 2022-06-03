import { Folder } from '@sharingan/database';

import { CreateFolderDto } from '../../../../index';

describe('Test Create Folder DTO', () => {
  it('should create a valid folder object', () => {
    // GIVEN
    const dto = new CreateFolderDto({
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      userId: 'dm34saxf6111113dabfed9tmm',
    });

    // WHEN
    const folder = dto.toFolder();

    // THEN
    expect(folder).toMatchObject<Folder>({
      createdAt: expect.any(Date),
      id: expect.any(String),
      isFavorite: false,
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      updatedAt: expect.any(Date),
      userId: 'dm34saxf6111113dabfed9tmm',
    });
  });

  it('should create the valid folder name', () => {
    // GIVEN
    const dto = new CreateFolderDto({
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      userId: 'dm34saxf6111113dabfed9tmm',
    });
    const expectedFolderName = 'blogs';

    // WHEN
    // THEN
    expect(dto.name).toEqual(expectedFolderName);
  });

  it('should create the valid folder parent id', () => {
    // GIVEN
    const dto = new CreateFolderDto({
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      userId: 'dm34saxf6111113dabfed9tmm',
    });
    const expectedParentId = 'cl23rzwe5000002czaedc8sll';

    // WHEN
    // THEN
    expect(dto.parentFolderId).toEqual(expectedParentId);
  });

  it('should create the valid folder user id', () => {
    // GIVEN
    const dto = new CreateFolderDto({
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      userId: 'dm34saxf6111113dabfed9tmm',
    });
    const expectedUserId = 'dm34saxf6111113dabfed9tmm';

    // WHEN
    // THEN
    expect(dto.user).toEqual(expectedUserId);
  });
});
