import { Folder, dbClient } from '@sharingan/database';
import SharinganError, { errors } from '@sharingan/utils';

import CreateFolderDto from './dtos/create-folder-dto';
import CreateUserRootFolderDto from './dtos/create-user-root-folder-dto';
import UpdateFolderDto from './dtos/update-folder-dto';
import { isFoldersContainRoot } from './utils/folders';

export default class FolderService {
  async createUserRootFolder(dto: CreateUserRootFolderDto): Promise<Folder> {
    const input = dto.toFolder();

    return dbClient.folder.create({
      data: {
        id: input.id,
        name: input.name,
        parentId: input.parentId,
        userId: input.userId,
      },
    });
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

    const input = createFolderDto.toFolder();

    const parentFolder = await this.findById(createFolderDto.parentFolderId);

    return dbClient.folder.create({
      data: {
        id: input.id,
        name: input.name,
        parentId: input.parentId,
        path: this.buildFolderPath(parentFolder),
        userId: input.userId,
      },
    });
  }

  async findUserFolders(userId: string): Promise<Folder[]> {
    return dbClient.folder.findMany({ orderBy: { name: 'asc' }, where: { userId } });
  }

  async findById(id: string): Promise<Folder> {
    const folder = await dbClient.folder.findUnique({ where: { id } });

    if (!folder) {
      throw new SharinganError(errors.FOLDER_NOT_FOUND(id), 'FOLDER_NOT_FOUND');
    }

    return folder;
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
      return this.findFolderSubFolders(folderId, userId);
    }

    const rootFolder = await this.findUserRootFolder(userId);

    return this.findFolderSubFolders(rootFolder.id, userId);
  }

  async deleteMany(folderIds: string[], userId: string): Promise<void> {
    const foldersToDelete = await dbClient.folder.findMany({
      where: {
        id: {
          in: folderIds,
        },
        userId,
      },
    });

    if (isFoldersContainRoot(foldersToDelete)) {
      throw new SharinganError(errors.CANT_DELETE_ROOT_FOLDER, 'CANT_DELETE_ROOT_FOLDER');
    }

    const ids = foldersToDelete.map((folder) => folder.id);

    await dbClient.folder.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async generateBreadcrumb(folderId: string): Promise<Folder[]> {
    const folder = await this.findById(folderId);

    const parentFolderIds = folder.path?.split('/') ?? [];

    if (parentFolderIds.length === 0) {
      return [];
    }

    const parentFoldersOrdered = await dbClient.folder.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      where: {
        id: {
          in: parentFolderIds,
        },
      },
    });

    // Remove the user root folder
    parentFoldersOrdered.shift();

    return parentFoldersOrdered.concat(folder);
  }

  async update(updateFolderDto: UpdateFolderDto): Promise<Folder> {
    const folder = await this.findById(updateFolderDto.folderId);

    if (folder.userId !== updateFolderDto.creatorId) {
      throw new SharinganError(errors.CANT_EDIT_FOLDER(updateFolderDto.creatorId, folder.id), 'CANT_EDIT_FOLDER');
    }

    if (!folder.parentId) {
      throw new SharinganError(errors.CANT_RENAME_ROOT_FOLDER, 'CANT_RENAME_ROOT_FOLDER');
    }

    const isFolderExist = await this.isFolderExistInParentFolder({
      folderName: updateFolderDto.name,
      parentFolderId: folder.parentId,
      userId: folder.userId,
    });

    if (isFolderExist) {
      throw new SharinganError(errors.FOLDER_ALREADY_EXIST(updateFolderDto.name), 'FOLDER_ALREADY_EXIST');
    }

    const input = updateFolderDto.toFolder(folder);

    return dbClient.folder.update({
      data: {
        name: input.name,
      },
      where: {
        id: folder.id,
      },
    });
  }

  private buildFolderPath(parentFolder: Folder): string {
    if (!parentFolder.path) {
      return parentFolder.id;
    }

    return [parentFolder.path, parentFolder.id].join('/');
  }

  private findFolderSubFolders(folderId: string, userId: string): Promise<Folder[]> {
    return dbClient.folder.findMany({
      where: {
        parentId: folderId,
        userId,
      },
    });
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
