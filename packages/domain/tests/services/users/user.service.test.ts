import { User } from '@sharingan/database';

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

    await userService.loadAdminUsers(roleAdmin);

    const adminUser = await userService.findByEmail('teco@sharingan.dev');

    expect(adminUser).toBeDefined();

    await deleteTestUsersById([adminUser?.id]);
  });

  it('should create a user', async () => {
    // GIVEN
    const role = await findTestRole('user');
    const createUserDto = await createTestUserDto(role.id);

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
      pictureUrl: createUserDto.toUser().pictureUrl,
      roleId: createUserDto.toUser().roleId,
      timezone: createUserDto.toUser().timezone,
      updatedAt: expect.any(Date),
      username: createUserDto.toUser().username,
    });

    await deleteTestUsersById([createdUser.id]);
  });

  it('should create a user - validation check', async () => {
    // GIVEN
    const role = await findTestRole('user');
    const createUserDto = await createTestUserDto(role.id);

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
      pictureUrl: createUserDto.toUser().pictureUrl,
      roleId: createUserDto.toUser().roleId,
      timezone: createUserDto.toUser().timezone,
      updatedAt: expect.any(Date),
      username: createUserDto.toUser().username,
    });

    await deleteTestUsersById([createdUser.id]);
  });

  it('should update user information', async () => {
    // GIVEN
    const currentUser = await createTestUser();

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
      pictureUrl: updateUserDto.toUser(currentUser).pictureUrl,
      roleId: updateUserDto.toUser(currentUser).roleId,
      timezone: updateUserDto.toUser(currentUser).timezone,
      updatedAt: expect.any(Date),
      username: currentUser.username,
    });

    await deleteTestUsersById([currentUser.id]);
  });
});
