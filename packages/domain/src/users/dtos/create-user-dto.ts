import * as bcrypt from 'bcryptjs';
import { dbId, User } from '@sharingan/database';
import { getEnv } from '@sharingan/utils';

export default class CreateUserDto {
  private enabled = false;

  constructor(
    private _email: string,
    private _firstName: string,
    private _lastName: string,
    private _rawPassword: string,
    private _roleId: string,
    private _pictureUrl: string | null,
    private _timezone: string | null,
    private _username: string | null,
  ) {}

  set isEnabled(value: boolean) {
    this.enabled = value;
  }

  toUser(): User {
    const passwordSalt = getEnv('PASSWORD_SALT');

    return {
      createdAt: new Date(),
      email: this._email,
      firstName: this._firstName,
      id: dbId.generate(),
      isEnabled: this.enabled,
      lastName: this._lastName,
      password: bcrypt.hashSync(this._rawPassword, passwordSalt),
      pictureUrl: this._pictureUrl,
      roleId: this._roleId,
      timezone: this._timezone,
      updatedAt: new Date(),
      username: this._username,
    };
  }
}
