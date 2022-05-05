import { Folder } from '../../../types/models';

export const isFoldersBelongToUser = (folders: Folder[], userId: string): boolean => {
  return folders.every((folder) => folder.userId === userId);
};

export const isFoldersContainRoot = (folders: Folder[]): boolean => {
  return folders.some((folder) => folder.parentId === null);
};
