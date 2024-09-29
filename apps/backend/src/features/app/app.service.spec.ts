import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';

import { PrismaService, RoleService, UserService } from '@snipcode/domain';

import { AppService } from './app.service';

const prismaServiceMock = mock<PrismaService>();
const roleServiceMock = mock<RoleService>();
const userServiceMock = mock<UserService>();

const { ADMIN_PASSWORD } = process.env;

describe('Test App Service', () => {
  let appService: AppService;
  let roleService: RoleService;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: PrismaService, useValue: prismaServiceMock },
        ConfigService,
        { provide: UserService, useValue: userServiceMock },
        { provide: RoleService, useValue: roleServiceMock },
        AppService,
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
    roleService = app.get<RoleService>(RoleService);
    userService = app.get<UserService>(UserService);
  });

  test('load default roles and users on service initialization', async () => {
    const role = {
      createdAt: new Date(),
      description: 'Administrator',
      id: '1',
      level: 1,
      name: 'admin' as const,
      updatedAt: new Date(),
    };

    roleServiceMock.findByName.mockResolvedValueOnce(role);

    await expect(appService.onModuleInit()).resolves.not.toThrow();

    expect(roleService.loadRoles).toHaveBeenCalledTimes(1);
    expect(userService.loadAdminUser).toHaveBeenCalledTimes(1);
    expect(userService.loadAdminUser).toHaveBeenCalledWith(role, ADMIN_PASSWORD);
  });
});
