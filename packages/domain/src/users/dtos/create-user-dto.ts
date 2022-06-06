import { OauthProvider, User, dbId } from '@sharingan/database';

type Input = {
  email: string;
  name: string;
  oauthProvider: OauthProvider;
  pictureUrl: string | null;
  roleId: string;
  timezone: string | null;
  username: string | null;
};

export default class CreateUserDto {
  private readonly userId: string;
  private enabled = false;

  constructor(private _input: Input) {
    this.userId = dbId.generate();
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
      pictureUrl: this._input.pictureUrl,
      roleId: this._input.roleId,
      timezone: this._input.timezone,
      updatedAt: new Date(),
      username: this._input.username,
    };
  }
}
