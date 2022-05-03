import { dbId, Folder } from '@sharingan/database';

export default class CreateFolderDto {
  constructor(private _userId: string, private _name: string, private _parentId: string | null) {}

  toFolder(): Folder {
    return {
      createdAt: new Date(),
      id: dbId.generate(),
      isFavorite: false,
      name: this._name,
      parentId: this._parentId,
      updatedAt: new Date(),
      userId: this._userId,
    };
  }
}
