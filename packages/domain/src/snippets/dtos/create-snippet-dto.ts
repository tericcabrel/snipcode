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
  constructor(private _input: Input) {}

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
      id: dbId.generate(),
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
