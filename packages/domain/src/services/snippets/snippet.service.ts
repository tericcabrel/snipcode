import { Injectable } from '@nestjs/common';
import { SnipcodeError, errors } from '@snipcode/utils';

import { CreateSnippetInput } from './inputs/create-snippet-input';
import { DeleteSnippetInput } from './inputs/delete-snippet-input';
import { UpdateSnippetInput } from './inputs/update-snippet-input';
import { Snippet, SnippetVisibility } from './snippet.entity';
import { PrismaService } from '../prisma.service';

const MAX_ITEM_PER_PAGE = 50;

const sortMethodMap: Record<'recently_updated' | 'recently_created', 'createdAt' | 'updatedAt'> = {
  recently_created: 'createdAt',
  recently_updated: 'updatedAt',
};

@Injectable()
export class SnippetService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSnippetInput: CreateSnippetInput): Promise<Snippet> {
    const isSnippetExist = await this.isSnippetExistInFolder(createSnippetInput.folderId, createSnippetInput.name);

    if (isSnippetExist) {
      throw new SnipcodeError(errors.SNIPPET_ALREADY_EXIST(createSnippetInput.name), 'SNIPPET_ALREADY_EXIST');
    }

    const input = createSnippetInput.toSnippet();

    return this.prisma.snippet.create({
      data: {
        content: input.content,
        contentHtml: input.contentHtml,
        description: input.description,
        folderId: input.folderId,
        id: input.id,
        language: input.language,
        lineHighlight: input.lineHighlight,
        name: input.name,
        size: input.size,
        theme: input.theme,
        userId: input.userId,
        visibility: input.visibility,
      },
    });
  }

  async findById(id: string): Promise<Snippet> {
    const snippet = await this.prisma.snippet.findUnique({ where: { id } });

    if (!snippet) {
      throw new SnipcodeError(errors.SNIPPET_NOT_FOUND(id), 'SNIPPET_NOT_FOUND');
    }

    return snippet;
  }

  async findByUser(userId: string): Promise<Snippet[]> {
    return this.prisma.snippet.findMany({ orderBy: { createdAt: 'desc' }, where: { userId } });
  }

  async findByFolder(folderId: string, visibility?: SnippetVisibility): Promise<Snippet[]> {
    return this.prisma.snippet.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        folderId,
        visibility,
      },
    });
  }

  async findPublicSnippet(args: {
    cursor?: string | null;
    itemPerPage: number;
    keyword?: string;
    sortMethod?: 'recently_updated' | 'recently_created';
  }): Promise<{ hasMore: boolean; items: Snippet[]; nextCursor: string | null }> {
    const { cursor, itemPerPage, keyword, sortMethod = 'recently_created' } = args;

    const limit = Math.min(MAX_ITEM_PER_PAGE, itemPerPage);

    // If the use has 20 we fetch 21 which help to know if there still more in the table
    const limitPlusOne = limit + 1;

    const snippets = await this.prisma.snippet.findMany({
      orderBy: { [sortMethodMap[sortMethod]]: 'desc' },
      take: limitPlusOne,
      where: {
        content: keyword ? { contains: keyword } : undefined,
        createdAt: cursor
          ? {
              lt: new Date(parseInt(cursor, 10)),
            }
          : undefined,
        visibility: 'public',
      },
    });

    const hasMore = snippets.length === limitPlusOne;
    const nextCursor = snippets.length > 0 ? snippets[snippets.length - 1].createdAt.getTime().toString() : null;

    return {
      hasMore,
      items: snippets.slice(0, limit),
      nextCursor: hasMore ? nextCursor : null,
    };
  }

  async delete(deleteSnippetInput: DeleteSnippetInput): Promise<void> {
    const snippet = await this.findById(deleteSnippetInput.snippetId);

    if (snippet.userId !== deleteSnippetInput.creatorId) {
      throw new SnipcodeError(errors.CANT_EDIT_SNIPPET(deleteSnippetInput.creatorId, snippet.id), 'CANT_EDIT_SNIPPET');
    }

    await this.prisma.snippet.delete({ where: { id: deleteSnippetInput.snippetId } });
  }

  async isSnippetExistInFolder(folderId: string, snippetName: string): Promise<boolean> {
    const snippets = await this.findByFolder(folderId);

    return snippets.some(({ name }) => name.toLowerCase() === snippetName.toLowerCase());
  }

  async update(updateSnippetInput: UpdateSnippetInput): Promise<Snippet> {
    const snippet = await this.findById(updateSnippetInput.snippetId);

    if (snippet.userId !== updateSnippetInput.creatorId) {
      throw new SnipcodeError(errors.CANT_EDIT_SNIPPET(updateSnippetInput.creatorId, snippet.id), 'CANT_EDIT_SNIPPET');
    }

    if (snippet.name !== updateSnippetInput.name) {
      const isSnippetExist = await this.isSnippetExistInFolder(snippet.folderId, updateSnippetInput.name);

      if (isSnippetExist) {
        throw new SnipcodeError(errors.SNIPPET_ALREADY_EXIST(updateSnippetInput.name), 'SNIPPET_ALREADY_EXIST');
      }
    }

    const input = updateSnippetInput.toSnippet(snippet);

    return this.prisma.snippet.update({
      data: {
        content: input.content,
        contentHtml: input.contentHtml,
        description: input.description,
        language: input.language,
        lineHighlight: input.lineHighlight,
        name: input.name,
        size: input.size,
        theme: input.theme,
        visibility: input.visibility,
      },
      where: {
        id: snippet.id,
      },
    });
  }
}
