import { dbId, Snippet, SnippetVisibility } from '@sharingan/database';

export default class CreateSnippetDto {
  constructor(
    private _name: string,
    private _userId: string,
    private _folderId: string,
    private _language: string,
    private _content: string,
    private _visibility: SnippetVisibility,
    private _description: string | null,
  ) {}

  private getContentSize(): number {
    return this._content.length;
  }

  toSnippet(): Snippet {
    return {
      content: this._content,
      createdAt: new Date(),
      description: this._description,
      folderId: this._folderId,
      id: dbId.generate(),
      language: this._language,
      name: this._name,
      size: this.getContentSize(),
      updatedAt: new Date(),
      userId: this._userId,
      visibility: this._visibility,
    };
  }
}
