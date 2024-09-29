import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import {
  CreateSnippetInput,
  DeleteSnippetInput,
  Folder,
  FolderService,
  Snippet,
  SnippetService,
  UpdateSnippetInput,
  User,
  UserService,
} from '@snipcode/domain';

import { AuthGuard, UserId } from '../../../configs/auth.guard';
import {
  CreateSnippetInput as CreateSnippetInputBody,
  PublicSnippetsInput,
  PublicSnippetsResult as PublicSnippetsResultGenerated,
  SnippetInfo as SnippetInfoGenerated,
  UpdateSnippetInput as UpdateSnippetInputBody,
} from '../../../types/graphql.schema';

type SnippetInfo = Omit<SnippetInfoGenerated, 'paths' | 'snippet'> & {
  paths: Folder[];
  snippet: Snippet;
};

type PublicSnippetsResult = Omit<PublicSnippetsResultGenerated, 'items'> & {
  items: Snippet[];
};

@Resolver('Snippet')
export class SnippetResolvers {
  constructor(
    private readonly snippetService: SnippetService,
    private readonly folderService: FolderService,
    private readonly userService: UserService,
  ) {}

  @Mutation('createSnippet')
  @UseGuards(AuthGuard)
  async createSnippet(@UserId() userId: string, @Args('input') input: CreateSnippetInputBody): Promise<Snippet> {
    const createSnippetInput = new CreateSnippetInput({
      content: input.content,
      contentHighlighted: input.contentHighlighted,
      description: input.description ?? null,
      folderId: input.folderId,
      language: input.language,
      lineHighlight: input.lineHighlight ?? null,
      name: input.name,
      theme: input.theme,
      userId,
      visibility: input.visibility,
    });

    return this.snippetService.create(createSnippetInput);
  }

  @Mutation('updateSnippet')
  @UseGuards(AuthGuard)
  async updateSnippet(
    @UserId() userId: string,
    @Args('id') id: string,
    @Args('input') input: UpdateSnippetInputBody,
  ): Promise<Snippet> {
    const updateSnippetInput = new UpdateSnippetInput({
      content: input.content,
      contentHighlighted: input.contentHighlighted,
      creatorId: userId,
      description: input.description ?? null,
      language: input.language,
      lineHighlight: input.lineHighlight ?? null,
      name: input.name,
      snippetId: id,
      theme: input.theme,
      visibility: input.visibility,
    });

    return this.snippetService.update(updateSnippetInput);
  }

  @Mutation('deleteSnippet')
  @UseGuards(AuthGuard)
  async deleteSnippets(@UserId() userId: string, @Args('id') id: string): Promise<boolean> {
    const deleteSnippetInput = new DeleteSnippetInput({
      creatorId: userId,
      snippetId: id,
    });

    await this.snippetService.delete(deleteSnippetInput);

    return true;
  }

  @Query('findSnippet')
  @UseGuards(AuthGuard)
  async findSnippet(@Args('snippetId') snippetId: string): Promise<SnippetInfo> {
    const snippet = await this.snippetService.findById(snippetId);
    const paths = await this.folderService.generateBreadcrumb(snippet.folderId);

    return {
      paths,
      snippet,
    };
  }

  @Query('mySnippets')
  @UseGuards(AuthGuard)
  async mySnippets(@UserId() userId: string): Promise<Snippet[]> {
    return this.snippetService.findByUser(userId);
  }

  @Query('publicSnippets')
  @UseGuards(AuthGuard)
  async publicSnippets(@Args('input') input: PublicSnippetsInput): Promise<PublicSnippetsResult> {
    const { itemPerPage, keyword, nextToken, sortMethod } = input;

    const result = await this.snippetService.findPublicSnippet({
      cursor: nextToken,
      itemPerPage: itemPerPage ?? 10,
      keyword: keyword ?? undefined,
      sortMethod: sortMethod ?? 'recently_created',
    });

    return {
      hasMore: result.hasMore,
      itemPerPage,
      items: result.items,
      nextToken: result.nextCursor,
    };
  }

  @ResolveField()
  async folder(@Parent() snippet: Snippet): Promise<Folder> {
    return this.folderService.findById(snippet.folderId);
  }

  @ResolveField()
  async user(@Parent() snippet: Snippet): Promise<User | null> {
    return this.userService.findById(snippet.userId);
  }

  @ResolveField()
  async contentHighlighted(@Parent() snippet: Snippet): Promise<string | null> {
    return snippet.contentHtml;
  }
}
