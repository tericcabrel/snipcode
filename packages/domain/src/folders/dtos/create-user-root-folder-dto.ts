import { dbId, Folder } from '@sharingan/database';

export default class CreateUserRootFolderDto {
  constructor(private _userId: string) {}

  toFolder(): Folder {
    return {
      createdAt: new Date(),
      id: dbId.generate(),
      isFavorite: false,
      name: `__${this._userId}__`,
      parentId: null,
      updatedAt: new Date(),
      userId: this._userId,
    };
  }
}
