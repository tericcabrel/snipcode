import { OauthProvider, User, dbId } from '@sharingan/database';

import { hashPassword } from '../../utils/helpers';

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

export default class CreateUserDto {
  readonly hashedPassword: string | null;

  private readonly userId: string;
  private enabled = false;

  constructor(private _input: Input) {
    this.userId = dbId.generate();
    this.hashedPassword = this._input.password ? hashPassword(this._input.password) : null;
  }

  get email(): string {
    return this._input.email;
  }

  set isEnabled(value: boolean) {
    this.enabled = value;
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
