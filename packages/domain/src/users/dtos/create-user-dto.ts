import * as bcrypt from 'bcryptjs';
import { dbId, User } from '@sharingan/database';

export default class CreateUserDto {
  private enabled = false;
  private readonly hashedPassword: string;

  constructor(
    private _email: string,
    private _firstName: string,
    private _lastName: string,
    private _roleId: string,
    private _pictureUrl: string | null,
    private _timezone: string | null,
    private _username: string | null,
    rawPassword: string,
  ) {
    this.hashedPassword = bcrypt.hashSync(rawPassword, 12);
  }

  get email(): string {
    return this._email;
  }

  set isEnabled(value: boolean) {
    this.enabled = value;
  }

  getHashedPassword(): string {
    return this.hashedPassword;
  }

  toUser(): User {
    return {
      createdAt: new Date(),
      email: this._email,
      firstName: this._firstName,
      id: dbId.generate(),
      isEnabled: this.enabled,
      lastName: this._lastName,
      password: this.hashedPassword,
      pictureUrl: this._pictureUrl,
      roleId: this._roleId,
      timezone: this._timezone,
      updatedAt: new Date(),
      username: this._username,
    };
  }
}
