import Folder from '../../entities/folder';
import BaseRepository from './_base';

type FolderRepositoryInterface = {
  bulkDelete: (ids: string[]) => Promise<void>;
  findByUser: (userId: string) => Promise<Folder[]>;
  findFolders: (folderIds: string[], userId: string) => Promise<Folder[]>;
  findSubFolders: (folderId: string, userId: string) => Promise<Folder[]>;
} & BaseRepository<Folder>;

export default FolderRepositoryInterface;
