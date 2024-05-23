import { dbID } from '../../../utils/db-id';
import { Folder } from '../folder.entity';

export class CreateUserRootFolderInput {
  private readonly folderId: string;

  constructor(private _userId: string) {
    this.folderId = dbID.generate();
  }

  toFolder(): Folder {
    return {
      createdAt: new Date(),
      id: this.folderId,
      isFavorite: false,
      name: `__${this._userId}__`,
      parentId: null,
      path: null,
      updatedAt: new Date(),
      userId: this._userId,
    };
  }
}
