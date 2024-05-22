import { isFoldersContainRoot } from './folders';
import { createTestFolderDto, generateTestId } from '../../../tests/helpers';
import { Folder } from '../../entities/folder';

describe('Test folders utilities', () => {
  it('should assert the folders contain the root folder', () => {
    // GIVEN
    const userId = generateTestId();

    const rootFolder = createTestFolderDto({ userId }).toFolder();

    rootFolder.parentId = null;

    const foldersToDelete: Folder[] = [createTestFolderDto({ userId }).toFolder(), rootFolder];

    // WHEN
    const isValid = isFoldersContainRoot(foldersToDelete);

    // THEN
    expect(isValid).toEqual(true);
  });

  it("should assert the folders doesn't contain the root folder", () => {
    // GIVEN
    const userId = generateTestId();

    const foldersToDelete: Folder[] = [
      createTestFolderDto({ userId }).toFolder(),
      createTestFolderDto({ userId }).toFolder(),
    ];

    // WHEN
    const isValid = isFoldersContainRoot(foldersToDelete);

    // THEN
    expect(isValid).toEqual(false);
  });
});
