import { isFoldersContainRoot } from './folders';
import { TestHelper } from '../../../../tests/helpers';
import { Folder } from '../folder.entity';

describe('Test folders utilities', () => {
  it('should assert the folders contain the root folder', () => {
    const userId = TestHelper.generateTestId();

    const rootFolder = TestHelper.createTestFolderInput({ userId }).toFolder();

    rootFolder.parentId = null;

    const foldersToDelete: Folder[] = [TestHelper.createTestFolderInput({ userId }).toFolder(), rootFolder];

    const isValid = isFoldersContainRoot(foldersToDelete);

    expect(isValid).toEqual(true);
  });

  it("should assert the folders doesn't contain the root folder", () => {
    const userId = TestHelper.generateTestId();

    const foldersToDelete: Folder[] = [
      TestHelper.createTestFolderInput({ userId }).toFolder(),
      TestHelper.createTestFolderInput({ userId }).toFolder(),
    ];

    const isValid = isFoldersContainRoot(foldersToDelete);

    expect(isValid).toEqual(false);
  });
});
