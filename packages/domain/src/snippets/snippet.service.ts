import { Snippet, SnippetVisibility, dbClient } from '@snipcode/database';
import SnipcodeError, { errors } from '@snipcode/utils';

import CreateSnippetDto from './dtos/create-snippet-dto';
import DeleteSnippetDto from './dtos/delete-snippet-dto';
import UpdateSnippetDto from './dtos/update-snippet-dto';

const MAX_ITEM_PER_PAGE = 50;

const sortMethodMap: Record<'recently_updated' | 'recently_created', 'createdAt' | 'updatedAt'> = {
  recently_created: 'createdAt',
  recently_updated: 'updatedAt',
};

export default class SnippetService {
  async create(createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    const isSnippetExist = await this.isSnippetExistInFolder(createSnippetDto.folderId, createSnippetDto.name);

    if (isSnippetExist) {
      throw new SnipcodeError(errors.SNIPPET_ALREADY_EXIST(createSnippetDto.name), 'SNIPPET_ALREADY_EXIST');
    }

    const input = createSnippetDto.toSnippet();

    return dbClient.snippet.create({
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
    const snippet = await dbClient.snippet.findUnique({ where: { id } });

    if (!snippet) {
      throw new SnipcodeError(errors.SNIPPET_NOT_FOUND(id), 'SNIPPET_NOT_FOUND');
    }

    return snippet;
  }

  async findByUser(userId: string): Promise<Snippet[]> {
    return dbClient.snippet.findMany({ orderBy: { createdAt: 'desc' }, where: { userId } });
  }

  async findByFolder(folderId: string, visibility?: SnippetVisibility): Promise<Snippet[]> {
    return dbClient.snippet.findMany({
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

    const snippets = await dbClient.snippet.findMany({
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

  async delete(deleteSnippetDto: DeleteSnippetDto): Promise<void> {
    const snippet = await this.findById(deleteSnippetDto.snippetId);

    if (snippet.userId !== deleteSnippetDto.creatorId) {
      throw new SnipcodeError(errors.CANT_EDIT_SNIPPET(deleteSnippetDto.creatorId, snippet.id), 'CANT_EDIT_SNIPPET');
    }

    await dbClient.snippet.delete({ where: { id: deleteSnippetDto.snippetId } });
  }

  async isSnippetExistInFolder(folderId: string, snippetName: string): Promise<boolean> {
    const snippets = await this.findByFolder(folderId);

    return snippets.some(({ name }) => name.toLowerCase() === snippetName.toLowerCase());
  }

  async update(updateSnippetDto: UpdateSnippetDto): Promise<Snippet> {
    const snippet = await this.findById(updateSnippetDto.snippetId);

    if (snippet.userId !== updateSnippetDto.creatorId) {
      throw new SnipcodeError(errors.CANT_EDIT_SNIPPET(updateSnippetDto.creatorId, snippet.id), 'CANT_EDIT_SNIPPET');
    }

    if (snippet.name !== updateSnippetDto.name) {
      const isSnippetExist = await this.isSnippetExistInFolder(snippet.folderId, updateSnippetDto.name);

      if (isSnippetExist) {
        throw new SnipcodeError(errors.SNIPPET_ALREADY_EXIST(updateSnippetDto.name), 'SNIPPET_ALREADY_EXIST');
      }
    }

    const input = updateSnippetDto.toSnippet(snippet);

    return dbClient.snippet.update({
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
