import { OauthProvider, User } from '../../entities/user';

type Input = {
  name: string;
  oauthProvider: OauthProvider;
  pictureUrl: string | null;
  roleId: string;
  timezone: string | null;
};

export class UpdateUserDto {
  private enabled = false;

  constructor(private _input: Input) {}

  set isEnabled(value: boolean) {
    this.enabled = value;
  }

  toUser(currentUser: User): User {
    return Object.assign(currentUser, {
      isEnabled: this.enabled,
      name: this._input.name,
      oauthProvider: this._input.oauthProvider,
      pictureUrl: this._input.pictureUrl,
      roleId: this._input.roleId,
      timezone: this._input.timezone,
    });
  }
}
