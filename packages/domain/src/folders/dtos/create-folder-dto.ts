import { dbId, Folder } from '@sharingan/database';

type Input = {
  name: string;
  parentId: string | null;
  userId: string;
};

export default class CreateFolderDto {
  constructor(private _input: Input) {}

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
