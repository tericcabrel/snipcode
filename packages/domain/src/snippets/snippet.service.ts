import { Snippet, SnippetRepository } from '@sharingan/database';

import CreateSnippetDto from './dtos/create-snippet-dto';

export default class SnippetService {
  constructor(private _snippetRepository: SnippetRepository) {}

  async create(createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    return this._snippetRepository.create(createSnippetDto.toSnippet());
  }

  async findById(id: string): Promise<Snippet | null> {
    return this._snippetRepository.findById(id);
  }

  async findByUser(userId: string): Promise<Snippet[]> {
    return this._snippetRepository.findByUser(userId);
  }

  async findByFolder(folderId: string): Promise<Snippet[]> {
    return this._snippetRepository.findByFolder(folderId);
  }

  async findPublicSnippet(): Promise<Snippet[]> {
    return this._snippetRepository.findByVisibility('public');
  }

  async delete(id: string): Promise<void> {
    await this._snippetRepository.delete(id);
  }

  async isSnippetExistInFolder(folderId: string, snippetName: string): Promise<boolean> {
    const snippets = await this.findByFolder(folderId);

    return snippets.some(({ name }) => name.toLowerCase() === snippetName.toLowerCase());
  }
}
