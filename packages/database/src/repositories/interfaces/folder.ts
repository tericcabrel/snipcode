import Folder from '../../entities/folder';
import BaseRepository from './_base';

type FolderRepositoryInterface = {
  findByUser: (userId: string) => Promise<Folder[]>;
  findFolders: (folderIds: string[]) => Promise<Folder[]>;
  findSubFolders: (folderId: string) => Promise<Folder[]>;
} & BaseRepository<Folder>;

export default FolderRepositoryInterface;
