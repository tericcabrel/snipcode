import { generateRandomId } from '@snipcode/utils';

import { dbID } from '../../../utils/db-id';
import { Session } from '../session.entity';

type Input = {
  expireDate: Date;
  userId: string;
};

export class CreateSessionInput {
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
