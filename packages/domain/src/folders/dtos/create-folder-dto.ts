import { Folder, dbId } from '@sharingan/database';

type Input = {
  name: string;
  parentId: string;
  userId: string;
};

export default class CreateFolderDto {
  private readonly folderId: string;

  constructor(private _input: Input) {
    this.folderId = dbId.generate();
  }

  get name(): string {
    return this._input.name;
  }

  get parentFolderId(): string {
    return this._input.parentId;
  }

  get user(): string {
    return this._input.userId;
  }

  toFolder(): Folder {
    return {
      createdAt: new Date(),
      id: this.folderId,
      isFavorite: false,
      name: this._input.name,
      parentId: this._input.parentId,
      updatedAt: new Date(),
      userId: this._input.userId,
    };
  }
}
