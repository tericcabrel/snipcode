import { generateRandomId } from '@snipcode/utils';

import { Session } from '../../entities/session';
import { dbID } from '../../utils/id';

type Input = {
  expireDate: Date;
  userId: string;
};

export class CreateSessionDto {
  private readonly sessionId: string;
  private readonly token: string;

  constructor(private _input: Input) {
    this.sessionId = dbID.generate();
    this.token = generateRandomId();
  }

  toSession(): Session {
    return {
      expires: this._input.expireDate,
      id: this.sessionId,
      token: this.token,
      userId: this._input.userId,
    };
  }
}
