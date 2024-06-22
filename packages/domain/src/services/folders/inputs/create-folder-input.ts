import { dbID } from '../../../utils/db-id';
import { Folder } from '../folder.entity';

type Input = {
  name: string;
  parentId: string;
  userId: string;
};

export class CreateFolderInput {
  private readonly folderId: string;

  constructor(private _input: Input) {
    this.folderId = dbID.generate();
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
      category: 'visible',
      createdAt: new Date(),
      id: this.folderId,
      isFavorite: false,
      name: this._input.name,
      parentId: this._input.parentId,
      path: null,
      updatedAt: new Date(),
      userId: this._input.userId,
    };
  }
}
