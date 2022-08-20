import { Snippet, SnippetVisibility } from '@sharingan/database';

type Input = {
  content: string;
  creatorId: string;
  description: string | null;
  language: string;
  lineHighlight: string | null;
  name: string;
  snippetId: string;
  theme: string;
  visibility: SnippetVisibility;
};

export default class UpdateSnippetDto {
  constructor(private _input: Input) {}

  get name(): string {
    return this._input.name;
  }

  get snippetId(): string {
    return this._input.snippetId;
  }

  get creatorId(): string {
    return this._input.creatorId;
  }

  toSnippet(currentSnippet: Snippet): Snippet {
    return {
      ...currentSnippet,
      content: this._input.content,
      description: this._input.description,
      language: this._input.language,
      lineHighlight: this._input.lineHighlight,
      name: this._input.name,
      size: this.getContentSize(),
      theme: this._input.theme,
      updatedAt: new Date(),
      visibility: this._input.visibility,
    };
  }

  private getContentSize(): number {
    return new TextEncoder().encode(this._input.content).buffer.byteLength;
  }
}
