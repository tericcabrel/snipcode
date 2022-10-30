import { Folder } from '@sharingan/database';

export const isFoldersContainRoot = (folders: Folder[]): boolean => {
  return folders.some((folder) => folder.parentId === null);
};
