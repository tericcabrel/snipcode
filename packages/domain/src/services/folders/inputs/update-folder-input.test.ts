import { UpdateFolderInput } from './update-folder-input';
import { TestHelper } from '../../../../tests/helpers';
import { Folder } from '../folder.entity';

describe('Test Update Folder Input', () => {
  it('should return the folder to update', () => {
    const parentId = TestHelper.generateTestId();
    const userId = TestHelper.generateTestId();

    const input = new UpdateFolderInput({
      creatorId: userId,
      folderId: parentId,
      name: 'folder updated',
    });

    const currentFolder = TestHelper.createTestFolderInput({ parentId, userId }).toFolder();

    const folderToUpdate = input.toFolder(currentFolder);

    const expectedFolder: Folder = {
      category: 'visible',
      createdAt: currentFolder.createdAt,
      id: currentFolder.id,
      name: 'folder updated',
      parentId: currentFolder.parentId,
      path: currentFolder.path,
      updatedAt: currentFolder.updatedAt,
      userId: currentFolder.userId,
    };

    expect(folderToUpdate).toMatchObject(expectedFolder);
  });
});
