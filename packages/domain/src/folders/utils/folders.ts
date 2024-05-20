import { Folder } from '../../entities/folder';

export const isFoldersContainRoot = (folders: Folder[]): boolean => {
  return folders.some((folder) => folder.parentId === null);
};
