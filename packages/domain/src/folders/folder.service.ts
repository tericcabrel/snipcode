import { Folder, FolderRepositoryInterface } from '@sharingan/database';
import SharinganError, { errors } from '@sharingan/utils';

import CreateFolderDto from './dtos/create-folder-dto';
import CreateUserRootFolderDto from './dtos/create-user-root-folder-dto';
import { isFoldersBelongToUser, isFoldersContainRoot } from './utils/folders';

export default class FolderService {
  constructor(private folderRepository: FolderRepositoryInterface) {}

  async createUserRootFolder(dto: CreateUserRootFolderDto): Promise<Folder> {
    return this.folderRepository.create(dto.toFolder());
  }

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    const isFolderExist = await this.isFolderExistInParentFolder({
      folderName: createFolderDto.name,
      parentFolderId: createFolderDto.parentFolderId,
      userId: createFolderDto.user,
    });

    if (isFolderExist) {
      throw new SharinganError(errors.FOLDER_ALREADY_EXIST(createFolderDto.name), 'FOLDER_ALREADY_EXIST');
    }

    return this.folderRepository.create(createFolderDto.toFolder());
  }

  async findUserFolders(userId: string): Promise<Folder[]> {
    return this.folderRepository.findByUser(userId);
  }

  async findById(id: string): Promise<Folder | null> {
    return this.folderRepository.findById(id);
  }

  async findUserRootFolder(userId: string): Promise<Folder> {
    const folders = await this.findUserFolders(userId);

    const rootFolder = folders.find((folder) => folder.parentId === null);

    if (!rootFolder) {
      throw new SharinganError(errors.USER_ROOT_FOLDER_NOT_FOUND(userId), 'USER_ROOT_FOLDER_NOT_FOUND');
    }

    return rootFolder;
  }

  async findSubFolders(userId: string, folderId?: string | null): Promise<Folder[]> {
    if (folderId) {
      return this.folderRepository.findSubFolders(folderId, userId);
    }

    const rootFolder = await this.findUserRootFolder(userId);

    if (!rootFolder) {
      return [];
    }

    return this.folderRepository.findSubFolders(rootFolder.id, userId);
  }

  async deleteMany(folderIds: string[], userId: string): Promise<void> {
    const foldersToDelete = await this.folderRepository.findFolders(folderIds, userId);

    if (!isFoldersBelongToUser(foldersToDelete, userId)) {
      throw new SharinganError(errors.FOLDERS_DONT_BELONG_TO_USER, 'FOLDERS_DONT_BELONG_TO_USER');
    }

    if (isFoldersContainRoot(foldersToDelete)) {
      throw new SharinganError(errors.CANT_DELETE_ROOT_FOLDER, 'CANT_DELETE_ROOT_FOLDER');
    }

    // TODO Delete snippets

    return this.folderRepository.bulkDelete(foldersToDelete.map((folder) => folder.id));
  }

  private async isFolderExistInParentFolder(args: {
    folderName: string;
    parentFolderId: string;
    userId: string;
  }): Promise<boolean> {
    const folders = await this.findSubFolders(args.userId, args.parentFolderId);

    return folders.some((folder) => folder.name.toLowerCase() === args.folderName.trim().toLowerCase());
  }
}
