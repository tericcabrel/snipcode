import { Snippet, SnippetVisibility, dbClient } from '@sharingan/database';
import SharinganError, { errors } from '@sharingan/utils';

import CreateSnippetDto from './dtos/create-snippet-dto';

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

  async findById(id: string): Promise<Snippet | null> {
    return dbClient.snippet.findUnique({ where: { id } });
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

  async delete(id: string): Promise<void> {
    const snippet = await dbClient.snippet.findFirst({ where: { id } });

    if (snippet) {
      await dbClient.snippet.delete({ where: { id } });
    }
  }

  async isSnippetExistInFolder(folderId: string, snippetName: string): Promise<boolean> {
    const snippets = await this.findByFolder(folderId);

    return snippets.some(({ name }) => name.toLowerCase() === snippetName.toLowerCase());
  }
}
