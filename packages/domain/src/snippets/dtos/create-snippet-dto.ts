import { Snippet, SnippetVisibility, dbId } from '@sharingan/database';

type Input = {
  content: string;
  contentHighlighted: string;
  description: string | null;
  folderId: string;
  language: string;
  lineHighlight: string | null;
  name: string;
  theme: string;
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
      contentHtml: this._input.contentHighlighted,
      createdAt: new Date(),
      description: this._input.description,
      folderId: this._input.folderId,
      id: this.snippetId,
      language: this._input.language,
      lineHighlight: this._input.lineHighlight,
      name: this._input.name,
      size: this.getContentSize(),
      theme: this._input.theme,
      updatedAt: new Date(),
      userId: this._input.userId,
      visibility: this._input.visibility,
    };
  }

  private getContentSize(): number {
    return new TextEncoder().encode(this._input.content).buffer.byteLength;
  }
}
