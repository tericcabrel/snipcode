import { Folder } from '../folder.entity';

type Input = {
  creatorId: string;
  folderId: string;
  name: string;
};

export class UpdateFolderInput {
  constructor(private _input: Input) {}

  get name(): string {
    return this._input.name;
  }

  get folderId(): string {
    return this._input.folderId;
  }

  get creatorId(): string {
    return this._input.creatorId;
  }

  toFolder(currentFolder: Folder): Folder {
    return {
      ...currentFolder,
      name: this._input.name,
      updatedAt: new Date(),
    };
  }
}
