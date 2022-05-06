import { dbId, Snippet, SnippetVisibility } from '@sharingan/database';

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

  private getContentSize(): number {
    return this._input.content.length;
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
}
