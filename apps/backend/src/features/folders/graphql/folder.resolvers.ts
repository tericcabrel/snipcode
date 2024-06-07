import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  CreateFolderInput,
  Folder,
  FolderService,
  Snippet,
  SnippetService,
  UpdateFolderInput,
  User,
  UserService,
} from '@snipcode/domain';

import { AuthGuard, UserId } from '../../../configs/auth.guard';
import {
  CreateFolderInput as CreateFolderInputBody,
  Directory as DirectoryGenerated,
  UpdateFolderInput as UpdateFolderInputBody,
} from '../../../types/graphql.schema';

type Directory = Omit<DirectoryGenerated, 'folders' | 'paths' | 'snippets'> & {
  folders: Folder[];
  paths: Folder[];
  snippets: Snippet[];
};

@Resolver('Folder')
export class FolderResolvers {
  constructor(
    private readonly folderService: FolderService,
    private readonly snippetService: SnippetService,
    private readonly userService: UserService,
  ) {}

  @Mutation('createFolder')
  @UseGuards(AuthGuard)
  async createFolder(@UserId() userId: string, @Args('input') input: CreateFolderInputBody): Promise<Folder> {
    const { name, parentId } = input;

    const createFolderInput = new CreateFolderInput({ name, parentId, userId });

    return this.folderService.create(createFolderInput);
  }

  @Mutation('updateFolder')
  @UseGuards(AuthGuard)
  async updateFolder(
    @UserId() userId: string,
    @Args('id') id: string,
    @Args('input') input: UpdateFolderInputBody,
  ): Promise<Folder> {
    const updateFolderInput = new UpdateFolderInput({
      creatorId: userId,
      folderId: id,
      name: input.name,
    });

    return this.folderService.update(updateFolderInput);
  }

  @Mutation('deleteFolders')
  @UseGuards(AuthGuard)
  async deleteFolders(@UserId() userId: string, @Args('folderIds') folderIds: string[]): Promise<boolean> {
    await this.folderService.deleteMany(folderIds, userId);

    return true;
  }

  @Query('listFolders')
  @UseGuards(AuthGuard)
  async listFolders(@UserId() userId: string, @Args('folderId') folderId: string): Promise<Folder[]> {
    return this.folderService.findSubFolders(userId, folderId);
  }

  @Query('listDirectory')
  @UseGuards(AuthGuard)
  async listDirectory(@UserId() userId: string, @Args('folderId') folderId: string): Promise<Directory> {
    const folders = await this.folderService.findSubFolders(userId, folderId);
    const snippets = await this.snippetService.findByFolder(folderId);
    const paths = await this.folderService.generateBreadcrumb(folderId);

    return {
      folders,
      paths,
      snippets,
    };
  }

  @Query('findFolder')
  @UseGuards(AuthGuard)
  async findFolder(@Args('folderId') folderId: string): Promise<Folder> {
    return this.folderService.findById(folderId);
  }

  @ResolveField()
  async parent(@Parent() folder: Folder): Promise<Folder | null> {
    if (!folder.parentId) {
      return null;
    }

    return this.folderService.findById(folder.parentId);
  }

  @ResolveField()
  async user(@Parent() folder: Folder): Promise<User | null> {
    return this.userService.findById(folder.userId);
  }

  @ResolveField()
  async subFolders(@Parent() folder: Folder): Promise<Folder[]> {
    return this.folderService.findSubFolders(folder.userId, folder.id);
  }

  @ResolveField()
  async subFoldersCount(@Parent() folder: Folder): Promise<number> {
    const folders = await this.folderService.findSubFolders(folder.userId, folder.id);
    const snippets = await this.snippetService.findByFolder(folder.id);

    return folders.length + snippets.length;
  }
}
