import { Role, RoleName } from '../../entities/role';
import { dbID } from '../../utils/id';

type Input = {
  description: string | null;
  level: number;
  name: RoleName;
};

export class CreateRoleDto {
  private readonly roleId: string;

  constructor(private _input: Input) {
    this.roleId = dbID.generate();
  }

  get name(): RoleName {
    return this._input.name;
  }

  get level(): number {
    return this._input.level;
  }

  get description(): string | null {
    return this._input.description;
  }

  toRole(): Role {
    return {
      createdAt: new Date(),
      description: this._input.description,
      id: this.roleId,
      level: this._input.level,
      name: this._input.name,
      updatedAt: new Date(),
    };
  }
}
