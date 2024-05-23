import { Test, TestingModule } from '@nestjs/testing';
import { SnipcodeError, errors, generateRandomId } from '@snipcode/utils';

import { User } from './user.entity';
import { UserService } from './user.service';
import { TestHelper } from '../../../tests/helpers';
import { DomainModule } from '../../domain.module';
import { PrismaService } from '../../prisma.service';
import { RoleService } from '../roles/role.service';

describe('Test User service', () => {
  let userService: UserService;
  let roleService: RoleService;
  let testHelper: TestHelper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DomainModule.forRootAsync({
          databaseUrl: process.env.TEST_DATABASE_URL,
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

  it('should load users in the database', async () => {
    const [roleAdmin] = await roleService.findAll();
    const adminPassword = 'VerStrongPassword';

    await userService.loadAdminUser(roleAdmin, adminPassword);

    const adminUser = await userService.findByEmail('teco@snipcode.dev');

    expect(adminUser).toBeDefined();

    await testHelper.deleteTestUsersById([adminUser?.id]);
  });

  it('should create a user', async () => {
    // GIVEN
    const role = await testHelper.findTestRole('user');
    const createUserInput = TestHelper.createTestUserInput({ roleId: role.id });

    // WHEN
    const createdUser = await userService.create(createUserInput);

    // THEN
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

  it('should create a user with no username', async () => {
    // GIVEN
    const role = await testHelper.findTestRole('user');
    const createUserInput = TestHelper.createTestUserInput({ roleId: role.id, username: null });

    // WHEN
    const createdUser = await userService.create(createUserInput);

    // THEN
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

  it('should create a user with a username that already exists', async () => {
    // GIVEN
    const role = await testHelper.findTestRole('user');
    const user = await testHelper.createTestUser({ username: 'roloto' });

    const createUserInput = await TestHelper.createTestUserInput({ roleId: role.id, username: 'roloto' });

    // WHEN
    const createdUser = await userService.create(createUserInput);

    // THEN
    expect(createdUser.username).not.toEqual('roloto');

    await testHelper.deleteTestUsersById([user.id, createdUser.id]);
  });

  it('should create a user - validation check', async () => {
    // GIVEN
    const role = await testHelper.findTestRole('user');
    const createUserInput = TestHelper.createTestUserInput({ roleId: role.id });

    createUserInput.isEnabled = true;

    // WHEN
    const createdUser = await userService.create(createUserInput);

    // THEN
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

  it('should fail create a user because the email address already exists', async () => {
    // GIVEN
    const user = await testHelper.createTestUser({ email: 'user@email.com' });
    const role = await testHelper.findTestRole('user');
    const createUserInput = TestHelper.createTestUserInput({ email: 'user@email.com', roleId: role.id });

    // WHEN
    // THEN
    await expect(async () => {
      await userService.create(createUserInput);
    }).rejects.toThrow(new SnipcodeError(errors.EMAIL_ALREADY_TAKEN, 'EMAIL_ALREADY_TAKEN'));

    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should update user information', async () => {
    // GIVEN
    const currentUser = await testHelper.createTestUser({});

    const role = await testHelper.findTestRole('admin');
    const updateUserInput = TestHelper.updateTestUserInput(role.id);

    // WHEN
    const updatedUser = await userService.update(currentUser, updateUserInput);

    // THEN
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

  it("should fail to authenticate the user because the email doesn't exists", async () => {
    // GIVEN
    const userEmail = 'email@test.com';
    const userPassword = 'strongPassword';

    // WHEN
    // THEN
    await expect(() => userService.login(userEmail, userPassword)).rejects.toThrow(
      new SnipcodeError(errors.LOGIN_FAILED, 'LOGIN_FAILED'),
    );
  });

  it('should fail to authenticate the user because the password is not correct', async () => {
    // GIVEN
    const userPassword = 'strongPassword';
    const userBadPassword = 'badPassword';
    const user = await testHelper.createTestUser({ oauthProvider: 'email', password: userPassword });

    // WHEN
    // THEN
    await expect(() => userService.login(user.email, userBadPassword)).rejects.toThrow(
      new SnipcodeError(errors.LOGIN_FAILED, 'LOGIN_FAILED'),
    );

    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should fail to authenticate the user because the user is disabled', async () => {
    // GIVEN
    const userPassword = 'strongPassword';
    const user = await testHelper.createTestUser({ oauthProvider: 'email', password: userPassword });

    // WHEN
    // THEN
    await expect(() => userService.login(user.email, userPassword)).rejects.toThrow(
      new SnipcodeError(errors.ACCOUNT_DISABLED, 'ACCOUNT_DISABLED'),
    );

    await testHelper.deleteTestUsersById([user.id]);
  });

  it('should successfully authenticate the user', async () => {
    // GIVEN
    const userPassword = 'strongPassword';
    const user = await testHelper.createTestUser({
      isEnabled: true,
      oauthProvider: 'email',
      password: userPassword,
    });

    // WHEN
    const authenticatedUser = await userService.login(user.email, userPassword);

    // THEN
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

  it('should found no user given the ID provided', async () => {
    // GIVEN
    const snippetId = generateRandomId();

    // WHEN
    const user = await userService.findById(snippetId);

    // THEN
    expect(user).toBeNull();
  });
});
