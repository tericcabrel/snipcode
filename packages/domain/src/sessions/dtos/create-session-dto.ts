import { Session, dbId } from '@snipcode/database';
import { generateRandomId } from '@snipcode/utils';

type Input = {
  expireDate: Date;
  userId: string;
};

export default class CreateSessionDto {
  private readonly sessionId: string;
  private readonly token: string;

  constructor(private _input: Input) {
    this.sessionId = dbId.generate();
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
