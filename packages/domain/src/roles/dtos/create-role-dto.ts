import { dbId, Role, RoleName } from '@sharingan/database';

export default class CreateRoleDto {
  constructor(private _name: RoleName, private _level: number, private _description: string | null) {}

  get name(): RoleName {
    return this._name;
  }

  get level(): number {
    return this._level;
  }

  get description(): string | null {
    return this._description;
  }

  toRole(): Role {
    return {
      createdAt: new Date(),
      description: this._description,
      id: dbId.generate(),
      level: this._level,
      name: this._name,
      updatedAt: new Date(),
    };
  }
}
