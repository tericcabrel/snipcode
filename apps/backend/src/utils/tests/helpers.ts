import { randEmail, randFullName, randImg, randNumber, randPassword, randTimeZone, randUserName } from '@ngneat/falso';
import {
  CreateUserInput,
  OauthProvider,
  PrismaService,
  Role,
  RoleName,
  RoleService,
  User,
  UserService,
} from '@snipcode/domain';

export type CreateUserInputArgs = {
  email: string;
  isEnabled: boolean;
  name: string;
  oauthProvider: OauthProvider;
  password?: string | null;
  pictureUrl: string | null;
  role: RoleName;
  roleId: string;
  timezone: string | null;
  username: string | null;
};
export class TestHelper {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  async findTestRole(name: RoleName): Promise<Role> {
    const role = await this.roleService.findByName(name);

    if (!role) {
      throw new Error(`Role with the name "${name}" not found!`);
    }

    return role;
  }

  static createTestUserInput(override: Partial<CreateUserInputArgs>): CreateUserInput {
    const input = new CreateUserInput({
      email: randEmail(),
      name: randFullName(),
      oauthProvider: 'github',
      password: randPassword(),
      pictureUrl: randImg(),
      roleId: 'roleId',
      timezone: randTimeZone(),
      username: randUserName(),
      ...override,
    });

    input.isEnabled = Boolean(override.isEnabled ?? randNumber({ max: 1, min: 0 }));

    return input;
  }

  async createTestUser(input: Partial<CreateUserInputArgs>): Promise<User> {
    const role = await this.findTestRole(input.role ?? 'user');

    const createUserInput = TestHelper.createTestUserInput({ ...input, roleId: role.id });

    return this.userService.create(createUserInput);
  }

  async cleanDatabase(): Promise<void> {
    await this.prismaService.user.deleteMany();
  }
}
