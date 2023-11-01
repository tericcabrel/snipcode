import { User } from '@snipcode/database';
import SnipcodeError, { errors, generateRandomId } from '@snipcode/utils';

import { roleService, userService } from '../../../index';
import {
  createTestUser,
  createTestUserDto,
  deleteTestUsersById,
  findTestRole,
  updateTestUserDto,
} from '../../setup/test-utils';

describe('Test User service', () => {
  beforeAll(async () => {
    await roleService.loadRoles();
  });

  it('should load users in the database', async () => {
    const [roleAdmin] = await roleService.findAll();
    const adminPassword = 'VerStrongPassword';

    await userService.loadAdminUser(roleAdmin, adminPassword);

    const adminUser = await userService.findByEmail('teco@snipcode.dev');

    expect(adminUser).toBeDefined();

    await deleteTestUsersById([adminUser?.id]);
  });

  it('should create a user', async () => {
    // GIVEN
    const role = await findTestRole('user');
    const createUserDto = await createTestUserDto({ roleId: role.id });

    // WHEN
    const createdUser = await userService.create(createUserDto);

    // THEN
    expect(createdUser).toMatchObject<User>({
      createdAt: expect.any(Date),
      email: createUserDto.email,
      id: createUserDto.toUser().id,
      isEnabled: createUserDto.toUser().isEnabled,
      name: createUserDto.toUser().name,
      oauthProvider: createUserDto.toUser().oauthProvider,
      password: null,
      pictureUrl: createUserDto.toUser().pictureUrl,
      roleId: createUserDto.toUser().roleId,
      timezone: createUserDto.toUser().timezone,
      updatedAt: expect.any(Date),
      username: createUserDto.toUser().username,
    });

    await deleteTestUsersById([createdUser.id]);
  });

  it('should create a user with no username', async () => {
    // GIVEN
    const role = await findTestRole('user');
    const createUserDto = await createTestUserDto({ roleId: role.id, username: null });

    // WHEN
    const createdUser = await userService.create(createUserDto);

    // THEN
    expect(createdUser).toMatchObject<User>({
      createdAt: expect.any(Date),
      email: createUserDto.email,
      id: createUserDto.toUser().id,
      isEnabled: createUserDto.toUser().isEnabled,
      name: createUserDto.toUser().name,
      oauthProvider: createUserDto.toUser().oauthProvider,
      password: null,
      pictureUrl: createUserDto.toUser().pictureUrl,
      roleId: createUserDto.toUser().roleId,
      timezone: createUserDto.toUser().timezone,
      updatedAt: expect.any(Date),
      username: expect.any(String),
    });

    await deleteTestUsersById([createdUser.id]);
  });

  it('should create a user with a username that already exists', async () => {
    // GIVEN
    const role = await findTestRole('user');
    const user = await createTestUser({ username: 'roloto' });

    const createUserDto = await createTestUserDto({ roleId: role.id, username: 'roloto' });

    // WHEN
    const createdUser = await userService.create(createUserDto);

    // THEN
    expect(createdUser.username).not.toEqual('roloto');

    await deleteTestUsersById([user.id, createdUser.id]);
  });

  it('should create a user - validation check', async () => {
    // GIVEN
    const role = await findTestRole('user');
    const createUserDto = await createTestUserDto({ roleId: role.id });

    createUserDto.isEnabled = true;

    // WHEN
    const createdUser = await userService.create(createUserDto);

    // THEN
    expect(createdUser).toMatchObject<User>({
      createdAt: expect.any(Date),
      email: createUserDto.email,
      id: createUserDto.toUser().id,
      isEnabled: createUserDto.toUser().isEnabled,
      name: createUserDto.toUser().name,
      oauthProvider: createUserDto.toUser().oauthProvider,
      password: null,
      pictureUrl: createUserDto.toUser().pictureUrl,
      roleId: createUserDto.toUser().roleId,
      timezone: createUserDto.toUser().timezone,
      updatedAt: expect.any(Date),
      username: createUserDto.toUser().username,
    });

    await deleteTestUsersById([createdUser.id]);
  });

  it('should fail create a user because the email address already exists', async () => {
    // GIVEN
    const user = await createTestUser({ email: 'user@email.com' });
    const role = await findTestRole('user');
    const createUserDto = await createTestUserDto({ email: 'user@email.com', roleId: role.id });

    // WHEN
    // THEN
    await expect(async () => {
      await userService.create(createUserDto);
    }).rejects.toThrow(new SnipcodeError(errors.EMAIL_ALREADY_TAKEN, 'EMAIL_ALREADY_TAKEN'));

    await deleteTestUsersById([user.id]);
  });

  it('should update user information', async () => {
    // GIVEN
    const currentUser = await createTestUser({});

    const role = await findTestRole('admin');
    const updateUserDto = updateTestUserDto(role.id);

    // WHEN
    const updatedUser = await userService.update(currentUser, updateUserDto);

    // THEN
    expect(updatedUser).toMatchObject<User>({
      createdAt: expect.any(Date),
      email: currentUser.email,
      id: currentUser.id,
      isEnabled: updateUserDto.toUser(currentUser).isEnabled,
      name: updateUserDto.toUser(currentUser).name,
      oauthProvider: updateUserDto.toUser(currentUser).oauthProvider,
      password: null,
      pictureUrl: updateUserDto.toUser(currentUser).pictureUrl,
      roleId: updateUserDto.toUser(currentUser).roleId,
      timezone: updateUserDto.toUser(currentUser).timezone,
      updatedAt: expect.any(Date),
      username: currentUser.username,
    });

    await deleteTestUsersById([currentUser.id]);
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
    const user = await createTestUser({ oauthProvider: 'email', password: userPassword });

    // WHEN
    // THEN
    await expect(() => userService.login(user.email, userBadPassword)).rejects.toThrow(
      new SnipcodeError(errors.LOGIN_FAILED, 'LOGIN_FAILED'),
    );

    await deleteTestUsersById([user.id]);
  });

  it('should fail to authenticate the user because the user is disabled', async () => {
    // GIVEN
    const userPassword = 'strongPassword';
    const user = await createTestUser({ oauthProvider: 'email', password: userPassword });

    // WHEN
    // THEN
    await expect(() => userService.login(user.email, userPassword)).rejects.toThrow(
      new SnipcodeError(errors.ACCOUNT_DISABLED, 'ACCOUNT_DISABLED'),
    );

    await deleteTestUsersById([user.id]);
  });

  it('should successfully authenticate the user', async () => {
    // GIVEN
    const userPassword = 'strongPassword';
    const user = await createTestUser({
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

    await deleteTestUsersById([user.id]);
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
