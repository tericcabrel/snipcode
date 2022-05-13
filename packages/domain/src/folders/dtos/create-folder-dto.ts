import { Folder, dbId } from '@sharingan/database';

type Input = {
  name: string;
  parentId: string;
  userId: string;
};

export default class CreateFolderDto {
  constructor(private _input: Input) {}

  get name(): string {
    return this._input.name;
  }

  get parentFolderId(): string {
    return this._input.parentId;
  }

  toFolder(): Folder {
    return {
      createdAt: new Date(),
      id: dbId.generate(),
      isFavorite: false,
      name: this._input.name,
      parentId: this._input.parentId,
      updatedAt: new Date(),
      userId: this._input.userId,
    };
  }
}
