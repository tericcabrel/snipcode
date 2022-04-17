import { dbId, OauthProvider, User } from '@sharingan/database';

type ConstructorArgs = {
  email: string;
  name: string;
  oauthProvider: OauthProvider;
  pictureUrl: string | null;
  roleId: string;
  timezone: string | null;
  username: string | null;
};

export default class UpdateUserDto {
  private enabled = false;

  constructor(private _args: ConstructorArgs) {}

  get email(): string {
    return this._args.email;
  }

  set isEnabled(value: boolean) {
    this.enabled = value;
  }

  toUser(): User {
    return {
      createdAt: new Date(),
      email: this._args.email,
      id: dbId.generate(),
      isEnabled: this.enabled,
      name: this._args.name,
      oauthProvider: this._args.oauthProvider,
      pictureUrl: this._args.pictureUrl,
      roleId: this._args.roleId,
      timezone: this._args.timezone,
      updatedAt: new Date(),
      username: this._args.username,
    };
  }
}
