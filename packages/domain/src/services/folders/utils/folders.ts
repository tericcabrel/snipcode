import { Folder } from '../folder.entity';

export const isFoldersContainRoot = (folders: Folder[]): boolean => {
  return folders.some((folder) => folder.parentId === null);
};
