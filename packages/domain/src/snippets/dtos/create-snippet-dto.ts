import { Snippet, SnippetVisibility, dbId } from '@sharingan/database';

type Input = {
  content: string;
  description: string | null;
  folderId: string;
  language: string;
  name: string;
  userId: string;
  visibility: SnippetVisibility;
};

export default class CreateSnippetDto {
  private readonly snippetId: string;

  constructor(private _input: Input) {
    this.snippetId = dbId.generate();
  }

  get folderId(): string {
    return this._input.folderId;
  }

  get name(): string {
    return this._input.name;
  }

  toSnippet(): Snippet {
    return {
      content: this._input.content,
      createdAt: new Date(),
      description: this._input.description,
      folderId: this._input.folderId,
      id: this.snippetId,
      language: this._input.language,
      name: this._input.name,
      size: this.getContentSize(),
      updatedAt: new Date(),
      userId: this._input.userId,
      visibility: this._input.visibility,
    };
  }

  private getContentSize(): number {
    return this._input.content.length;
  }
}
