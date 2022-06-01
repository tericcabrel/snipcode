import { Folder } from '@sharingan/database';

import { CreateFolderDto } from '../../../../index';

describe('Test Create Folder DTO', () => {
  it('should return a valid folder object', () => {
    const dto = new CreateFolderDto({
      name: 'blogs',
      parentId: 'cl23rzwe5000002czaedc8sll',
      userId: 'dm34saxf6111113dabfed9tmm',
    });

    const folder = dto.toFolder();

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
});
