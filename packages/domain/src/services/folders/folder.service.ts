import { Injectable } from '@nestjs/common';
import { AppError, errors } from '@snipcode/utils';

import { Folder } from './folder.entity';
import { CreateFolderInput } from './inputs/create-folder-input';
import { CreateUserRootFolderInput } from './inputs/create-user-root-folder-input';
import { UpdateFolderInput } from './inputs/update-folder-input';
import { isFoldersContainRoot } from './utils/folders';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FolderService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserRootFolder(input: CreateUserRootFolderInput): Promise<Folder> {
    const folderInput = input.toFolder();

    return this.prisma.folder.create({
      data: {
        id: folderInput.id,
        name: folderInput.name,
        parentId: folderInput.parentId,
        userId: folderInput.userId,
      },
    });
  }

  async create(createFolderInput: CreateFolderInput): Promise<Folder> {
    const isFolderExist = await this.isFolderExistInParentFolder({
      folderName: createFolderInput.name,
      parentFolderId: createFolderInput.parentFolderId,
      userId: createFolderInput.user,
    });

    if (isFolderExist) {
      throw new AppError(errors.FOLDER_ALREADY_EXIST(createFolderInput.name), 'FOLDER_ALREADY_EXIST');
    }

    const input = createFolderInput.toFolder();

    const parentFolder = await this.findById(createFolderInput.parentFolderId);

    return this.prisma.folder.create({
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
    return this.prisma.folder.findMany({ orderBy: { name: 'asc' }, where: { userId } });
  }

  async findById(id: string): Promise<Folder> {
    const folder = await this.prisma.folder.findUnique({ where: { id } });

    if (!folder) {
      throw new AppError(errors.FOLDER_NOT_FOUND(id), 'FOLDER_NOT_FOUND');
    }

    return folder;
  }

  async findUserRootFolder(userId: string): Promise<Folder> {
    const folders = await this.findUserFolders(userId);

    const rootFolder = folders.find((folder) => folder.parentId === null);

    if (!rootFolder) {
      throw new AppError(errors.USER_ROOT_FOLDER_NOT_FOUND(userId), 'USER_ROOT_FOLDER_NOT_FOUND');
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
    const foldersToDelete = await this.prisma.folder.findMany({
      where: {
        id: {
          in: folderIds,
        },
        userId,
      },
    });

    if (isFoldersContainRoot(foldersToDelete)) {
      throw new AppError(errors.CANT_DELETE_ROOT_FOLDER, 'CANT_DELETE_ROOT_FOLDER');
    }

    const ids = foldersToDelete.map((folder) => folder.id);

    await this.prisma.folder.deleteMany({
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

    const parentFoldersOrdered = await this.prisma.folder.findMany({
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

  async update(updateFolderInput: UpdateFolderInput): Promise<Folder> {
    const folder = await this.findById(updateFolderInput.folderId);

    if (folder.userId !== updateFolderInput.creatorId) {
      throw new AppError(errors.CANT_EDIT_FOLDER(updateFolderInput.creatorId, folder.id), 'CANT_EDIT_FOLDER');
    }

    if (!folder.parentId) {
      throw new AppError(errors.CANT_RENAME_ROOT_FOLDER, 'CANT_RENAME_ROOT_FOLDER');
    }

    const isFolderExist = await this.isFolderExistInParentFolder({
      folderName: updateFolderInput.name,
      parentFolderId: folder.parentId,
      userId: folder.userId,
    });

    if (isFolderExist) {
      throw new AppError(errors.FOLDER_ALREADY_EXIST(updateFolderInput.name), 'FOLDER_ALREADY_EXIST');
    }

    const input = updateFolderInput.toFolder(folder);

    return this.prisma.folder.update({
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
    return this.prisma.folder.findMany({
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
