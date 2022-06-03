import { Folder, dbId } from '@sharingan/database';

export default class CreateUserRootFolderDto {
  private readonly folderId: string;

  constructor(private _userId: string) {
    this.folderId = dbId.generate();
  }

  toFolder(): Folder {
    return {
      createdAt: new Date(),
      id: this.folderId,
      isFavorite: false,
      name: `__${this._userId}__`,
      parentId: null,
      updatedAt: new Date(),
      userId: this._userId,
    };
  }
}
