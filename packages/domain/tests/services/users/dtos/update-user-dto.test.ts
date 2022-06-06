import { User } from '@sharingan/database';

import { UpdateUserDto } from '../../../../index';
import { createTestUserDto, generateTestId } from '../../../setup/test-utils';

describe('Test Update User DTO', () => {
  it('should return the user to update', () => {
    const dto = new UpdateUserDto({
      name: 'user updated',
      oauthProvider: 'github',
      pictureUrl: 'updated pictureUrl',
      roleId: 'updated roleId',
      timezone: 'Europe/Paris',
    });

    const roleId = generateTestId();
    const currentUser = createTestUserDto(roleId).toUser();

    const userToUpdate = dto.toUser(currentUser);

    const expectedUser: User = {
      createdAt: currentUser.createdAt,
      email: userToUpdate.email,
      id: currentUser.id,
      isEnabled: false,
      name: 'user updated',
      oauthProvider: 'github',
      pictureUrl: 'updated pictureUrl',
      roleId: 'updated roleId',
      timezone: 'Europe/Paris',
      updatedAt: currentUser.updatedAt,
      username: currentUser.username,
    };

    expect(userToUpdate).toMatchObject(expectedUser);
  });

  it('should return the user to update - validation check', () => {
    const dto = new UpdateUserDto({
      name: 'user updated',
      oauthProvider: 'github',
      pictureUrl: 'updated pictureUrl',
      roleId: 'updated roleId',
      timezone: 'Europe/Paris',
    });

    const roleId = generateTestId();
    const currentUser = createTestUserDto(roleId).toUser();

    dto.isEnabled = true;
    const userToUpdate = dto.toUser(currentUser);

    const expectedUser: User = {
      createdAt: currentUser.createdAt,
      email: userToUpdate.email,
      id: currentUser.id,
      isEnabled: true,
      name: 'user updated',
      oauthProvider: 'github',
      pictureUrl: 'updated pictureUrl',
      roleId: 'updated roleId',
      timezone: 'Europe/Paris',
      updatedAt: currentUser.updatedAt,
      username: currentUser.username,
    };

    expect(userToUpdate).toMatchObject(expectedUser);
  });
});
