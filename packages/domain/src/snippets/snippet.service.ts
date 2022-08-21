import { Snippet, SnippetVisibility, dbClient } from '@sharingan/database';
import SharinganError, { errors } from '@sharingan/utils';

import CreateSnippetDto from './dtos/create-snippet-dto';
import DeleteSnippetDto from './dtos/delete-snippet-dto';
import UpdateSnippetDto from './dtos/update-snippet-dto';

export default class SnippetService {
  async create(createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    const isSnippetExist = await this.isSnippetExistInFolder(createSnippetDto.folderId, createSnippetDto.name);

    if (isSnippetExist) {
      throw new SharinganError(errors.SNIPPET_ALREADY_EXIST(createSnippetDto.name), 'SNIPPET_ALREADY_EXIST');
    }

    const input = createSnippetDto.toSnippet();

    return dbClient.snippet.create({
      data: {
        content: input.content,
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
      throw new SharinganError(errors.SNIPPET_NOT_FOUND(id), 'SNIPPET_NOT_FOUND');
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

  async findPublicSnippet(): Promise<Snippet[]> {
    return dbClient.snippet.findMany({
      orderBy: { createdAt: 'desc' },
      where: { visibility: 'public' },
    });
  }

  async delete(deleteSnippetDto: DeleteSnippetDto): Promise<void> {
    const snippet = await this.findById(deleteSnippetDto.snippetId);

    if (snippet.userId !== deleteSnippetDto.creatorId) {
      throw new SharinganError(errors.CANT_EDIT_SNIPPET(deleteSnippetDto.creatorId, snippet.id), 'CANT_EDIT_SNIPPET');
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
      throw new SharinganError(errors.CANT_EDIT_SNIPPET(updateSnippetDto.creatorId, snippet.id), 'CANT_EDIT_SNIPPET');
    }

    if (snippet.name !== updateSnippetDto.name) {
      const isSnippetExist = await this.isSnippetExistInFolder(snippet.folderId, updateSnippetDto.name);

      if (isSnippetExist) {
        throw new SharinganError(errors.SNIPPET_ALREADY_EXIST(updateSnippetDto.name), 'SNIPPET_ALREADY_EXIST');
      }
    }

    const input = updateSnippetDto.toSnippet(snippet);

    return dbClient.snippet.update({
      data: {
        content: input.content,
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
