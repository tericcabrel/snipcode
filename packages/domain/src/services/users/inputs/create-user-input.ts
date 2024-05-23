import { dbID } from '../../../utils/db-id';
import { hashPassword } from '../../../utils/helpers';
import { OauthProvider, User } from '../user.entity';

type Input = {
  email: string;
  name: string;
  oauthProvider: OauthProvider;
  password?: string | null;
  pictureUrl: string | null;
  roleId: string;
  timezone: string | null;
  username: string | null;
};

export class CreateUserInput {
  readonly hashedPassword: string | null;

  private readonly userId: string;
  private enabled = false;

  constructor(private _input: Input) {
    this.userId = dbID.generate();
    this.hashedPassword = this._input.password ? hashPassword(this._input.password) : null;
  }

  get email(): string {
    return this._input.email;
  }

  get username(): string | null {
    return this._input.username;
  }

  set isEnabled(value: boolean) {
    this.enabled = value;
  }

  setUsername(value: string) {
    this._input.username = value;
  }

  toUser(): User {
    return {
      createdAt: new Date(),
      email: this._input.email,
      id: this.userId,
      isEnabled: this.enabled,
      name: this._input.name,
      oauthProvider: this._input.oauthProvider,
      password: this.hashedPassword,
      pictureUrl: this._input.pictureUrl,
      roleId: this._input.roleId,
      timezone: this._input.timezone,
      updatedAt: new Date(),
      username: this._input.username,
    };
  }
}
