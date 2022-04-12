import { dbId, OauthProvider, User } from '@sharingan/database';

export default class CreateUserDto {
  private enabled = false;

  constructor(
    private _email: string,
    private _firstName: string,
    private _lastName: string,
    private _roleId: string,
    private _accessToken: string,
    private _oauthProvider: OauthProvider,
    private _pictureUrl: string | null,
    private _timezone: string | null,
    private _username: string | null,
  ) {}

  get email(): string {
    return this._email;
  }

  set isEnabled(value: boolean) {
    this.enabled = value;
  }

  toUser(): User {
    return {
      accessToken: this._accessToken,
      createdAt: new Date(),
      email: this._email,
      firstName: this._firstName,
      id: dbId.generate(),
      isEnabled: this.enabled,
      lastName: this._lastName,
      oauthProvider: this._oauthProvider,
      pictureUrl: this._pictureUrl,
      roleId: this._roleId,
      timezone: this._timezone,
      updatedAt: new Date(),
      username: this._username,
    };
  }
}
