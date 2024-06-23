import { dbID } from '../../../utils/db-id';
import { Folder } from '../folder.entity';

export class CreateUserRootFolderInput {
  private readonly folderId: string;

  constructor(private _userId: string) {
    this.folderId = dbID.generate();
  }

  toFolder(): Folder {
    return {
      category: 'visible',
      createdAt: new Date(),
      id: this.folderId,
      name: `__${this._userId}__`,
      parentId: null,
      path: null,
      updatedAt: new Date(),
      userId: this._userId,
    };
  }
}
