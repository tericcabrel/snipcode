type Input = {
  creatorId: string;
  snippetId: string;
};

export class DeleteSnippetDto {
  constructor(private _input: Input) {}

  get snippetId(): string {
    return this._input.snippetId;
  }

  get creatorId(): string {
    return this._input.creatorId;
  }
}
