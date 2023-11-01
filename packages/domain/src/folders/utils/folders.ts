import { Folder } from '@snipcode/database';

export const isFoldersContainRoot = (folders: Folder[]): boolean => {
  return folders.some((folder) => folder.parentId === null);
};
