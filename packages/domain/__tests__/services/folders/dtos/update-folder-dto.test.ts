import { Folder } from '@sharingan/database';

import { UpdateFolderDto } from '../../../../index';
import { createTestFolderDto, generateTestId } from '../../../setup/test-utils';

describe('Test Update Folder DTO', () => {
  it('should return the folder to update', () => {
    const parentId = generateTestId();
    const userId = generateTestId();

    const dto = new UpdateFolderDto({
      creatorId: userId,
      folderId: parentId,
      name: 'folder updated',
    });

    const currentFolder = createTestFolderDto({ parentId, userId }).toFolder();

    const folderToUpdate = dto.toFolder(currentFolder);

    const expectedFolder: Folder = {
      createdAt: currentFolder.createdAt,
      id: currentFolder.id,
      isFavorite: currentFolder.isFavorite,
      name: 'folder updated',
      parentId: currentFolder.parentId,
      path: currentFolder.path,
      updatedAt: currentFolder.updatedAt,
      userId: currentFolder.userId,
    };

    expect(folderToUpdate).toMatchObject(expectedFolder);
  });
});
