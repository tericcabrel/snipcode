import { Test, TestingModule } from '@nestjs/testing';
import { AppError, errors, generateRandomId } from '@snipcode/utils';

import { User } from './user.entity';
import { UserService } from './user.service';
import { TestHelper } from '../../../tests/helpers';
import { DomainModule } from '../../domain.module';
import { PrismaService } from '../prisma.service';
import { RoleService } from '../roles/role.service';

describe('Test User service', () => {
  let userService: UserService;
  let roleService: RoleService;
  let testHelper: TestHelper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DomainModule.forRootAsync({
          useFactory: () => {
            return {
              convertKit: {
                apiKey: 'apiKey',
                formId: 'formId',
              },
              databaseUrl: process.env.DATABASE_URL,
            };
          },
        }),
      ],
      providers: [UserService, RoleService],
    }).compile();

    userService = module.get<UserService>(UserService);
    roleService = module.get<RoleService>(RoleService);

    const prismaService = module.get<PrismaService>(PrismaService);

    testHelper = new TestHelper(prismaService);

    await roleService.loadRoles();
  });

  test('Load users in the database', async () => {
    const [roleAdmin] = await roleService.findAll();
    const adminPassword = 'VeryStrongPassword';

    await userService.loadAdminUser(roleAdmin, adminPassword);

    const adminUser = await userService.findByEmail('teco@snipcode.dev');

    expect(adminUser).toBeDefined();

    await testHelper.deleteTestUsersById([adminUser?.id]);
  });

  test('Create a user', async () => {
    const role = await testHelper.findTestRole('user');
    const createUserInput = TestHelper.createTestUserInput({ roleId: role.id });

    const createdUser = await userService.create(createUserInput);

    expect(createdUser).toMatchObject<User>({
      createdAt: expect.any(Date),
      email: createUserInput.email,
      id: createUserInput.toUser().id,
      isEnabled: createUserInput.toUser().isEnabled,
      name: createUserInput.toUser().name,
      oauthProvider: createUserInput.toUser().oauthProvider,
      password: null,
      pictureUrl: createUserInput.toUser().pictureUrl,
      roleId: createUserInput.toUser().roleId,
      timezone: createUserInput.toUser().timezone,
      updatedAt: expect.any(Date),
      username: createUserInput.toUser().username,
    });

    await testHelper.deleteTestUsersById([createdUser.id]);
  });

  test('Create a user with no username', async () => {
    const role = await testHelper.findTestRole('user');
    const createUserInput = TestHelper.createTestUserInput({ roleId: role.id, username: null });

    const createdUser = await userService.create(createUserInput);

    expect(createdUser).toMatchObject<User>({
      createdAt: expect.any(Date),
      email: createUserInput.email,
      id: createUserInput.toUser().id,
      isEnabled: createUserInput.toUser().isEnabled,
      name: createUserInput.toUser().name,
      oauthProvider: createUserInput.toUser().oauthProvider,
      password: null,
      pictureUrl: createUserInput.toUser().pictureUrl,
      roleId: createUserInput.toUser().roleId,
      timezone: createUserInput.toUser().timezone,
      updatedAt: expect.any(Date),
      username: expect.any(String),
    });

    await testHelper.deleteTestUsersById([createdUser.id]);
  });

  test('Create a user with a username that already exists will generate a new one for him', async () => {
    const role = await testHelper.findTestRole('user');
    const user = await testHelper.createTestUser({ username: 'roloto' });

    const createUserInput = TestHelper.createTestUserInput({ roleId: role.id, username: 'roloto' });

    const createdUser = await userService.create(createUserInput);

    expect(createdUser.username).not.toEqual('roloto');

    await testHelper.deleteTestUsersById([user.id, createdUser.id]);
  });

  test('Create a user - validation check', async () => {
    const role = await testHelper.findTestRole('user');
    const createUserInput = TestHelper.createTestUserInput({ roleId: role.id });

    createUserInput.isEnabled = true;

    const createdUser = await userService.create(createUserInput);

    expect(createdUser).toMatchObject<User>({
      createdAt: expect.any(Date),
      email: createUserInput.email,
      id: createUserInput.toUser().id,
      isEnabled: createUserInput.toUser().isEnabled,
      name: createUserInput.toUser().name,
      oauthProvider: createUserInput.toUser().oauthProvider,
      password: null,
      pictureUrl: createUserInput.toUser().pictureUrl,
      roleId: createUserInput.toUser().roleId,
      timezone: createUserInput.toUser().timezone,
      updatedAt: expect.any(Date),
      username: createUserInput.toUser().username,
    });

    await testHelper.deleteTestUsersById([createdUser.id]);
  });

  test('Can not create a user because the email address already exists', async () => {
    const user = await testHelper.createTestUser({ email: 'user@email.com' });
    const role = await testHelper.findTestRole('user');
    const createUserInput = TestHelper.createTestUserInput({ email: 'user@email.com', roleId: role.id });

    await expect(async () => {
      await userService.create(createUserInput);
    }).rejects.toThrow(new AppError(errors.EMAIL_ALREADY_TAKEN, 'EMAIL_ALREADY_TAKEN'));

    await testHelper.deleteTestUsersById([user.id]);
  });

  test('Update user information', async () => {
    const currentUser = await testHelper.createTestUser({});

    const role = await testHelper.findTestRole('admin');
    const updateUserInput = TestHelper.updateTestUserInput(role.id);

    const updatedUser = await userService.update(currentUser, updateUserInput);

    expect(updatedUser).toMatchObject<User>({
      createdAt: expect.any(Date),
      email: currentUser.email,
      id: currentUser.id,
      isEnabled: updateUserInput.toUser(currentUser).isEnabled,
      name: updateUserInput.toUser(currentUser).name,
      oauthProvider: updateUserInput.toUser(currentUser).oauthProvider,
      password: null,
      pictureUrl: updateUserInput.toUser(currentUser).pictureUrl,
      roleId: updateUserInput.toUser(currentUser).roleId,
      timezone: updateUserInput.toUser(currentUser).timezone,
      updatedAt: expect.any(Date),
      username: currentUser.username,
    });

    await testHelper.deleteTestUsersById([currentUser.id]);
  });

  test("Fail to authenticate the user because the email doesn't exists", async () => {
    const userEmail = 'email@test.com';
    const userPassword = 'strongPassword';

    await expect(() => userService.login(userEmail, userPassword)).rejects.toThrow(
      new AppError(errors.LOGIN_FAILED, 'LOGIN_FAILED'),
    );
  });

  test('Fail to authenticate the user because the password is not correct', async () => {
    const userPassword = 'strongPassword';
    const userBadPassword = 'badPassword';
    const user = await testHelper.createTestUser({ oauthProvider: 'email', password: userPassword });

    await expect(() => userService.login(user.email, userBadPassword)).rejects.toThrow(
      new AppError(errors.LOGIN_FAILED, 'LOGIN_FAILED'),
    );

    await testHelper.deleteTestUsersById([user.id]);
  });

  test('Fail to authenticate the user because the user is disabled', async () => {
    const userPassword = 'strongPassword';
    const user = await testHelper.createTestUser({ oauthProvider: 'email', password: userPassword });

    await expect(() => userService.login(user.email, userPassword)).rejects.toThrow(
      new AppError(errors.ACCOUNT_DISABLED, 'ACCOUNT_DISABLED'),
    );

    await testHelper.deleteTestUsersById([user.id]);
  });

  test('Authenticate a user', async () => {
    const userPassword = 'strongPassword';
    const user = await testHelper.createTestUser({
      isEnabled: true,
      oauthProvider: 'email',
      password: userPassword,
    });

    const authenticatedUser = await userService.login(user.email, userPassword);

    expect(user).toMatchObject({
      email: authenticatedUser.email,
      id: authenticatedUser.id,
      name: authenticatedUser.name,
      oauthProvider: authenticatedUser.oauthProvider,
      roleId: authenticatedUser.roleId,
      username: authenticatedUser.username,
    });

    await testHelper.deleteTestUsersById([user.id]);
  });

  test("Can not find the user by its ID because it doesn't exist", async () => {
    const snippetId = generateRandomId();

    const user = await userService.findById(snippetId);

    expect(user).toBeNull();
  });
});
