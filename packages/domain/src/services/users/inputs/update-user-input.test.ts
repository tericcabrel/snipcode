import { UpdateUserInput } from './update-user-input';
import { TestHelper } from '../../../../tests/helpers';
import { User } from '../user.entity';

describe('Test Update User Input', () => {
  it('should return the user to update', () => {
    const input = new UpdateUserInput({
      name: 'user updated',
      oauthProvider: 'github',
      pictureUrl: 'updated pictureUrl',
      roleId: 'updated roleId',
      timezone: 'Europe/Paris',
    });

    const roleId = TestHelper.generateTestId();
    const currentUser = TestHelper.createTestUserInput({ roleId }).toUser();

    const userToUpdate = input.toUser(currentUser);

    const expectedUser: User = {
      createdAt: currentUser.createdAt,
      email: userToUpdate.email,
      id: currentUser.id,
      isEnabled: false,
      name: 'user updated',
      oauthProvider: 'github',
      password: null,
      pictureUrl: 'updated pictureUrl',
      roleId: 'updated roleId',
      timezone: 'Europe/Paris',
      updatedAt: currentUser.updatedAt,
      username: currentUser.username,
    };

    expect(userToUpdate).toMatchObject(expectedUser);
  });

  it('should return the user to update - validation check', () => {
    const input = new UpdateUserInput({
      name: 'user updated',
      oauthProvider: 'github',
      pictureUrl: 'updated pictureUrl',
      roleId: 'updated roleId',
      timezone: 'Europe/Paris',
    });

    const roleId = TestHelper.generateTestId();
    const currentUser = TestHelper.createTestUserInput({ roleId }).toUser();

    input.isEnabled = true;
    const userToUpdate = input.toUser(currentUser);

    const expectedUser: User = {
      createdAt: currentUser.createdAt,
      email: userToUpdate.email,
      id: currentUser.id,
      isEnabled: true,
      name: 'user updated',
      oauthProvider: 'github',
      password: null,
      pictureUrl: 'updated pictureUrl',
      roleId: 'updated roleId',
      timezone: 'Europe/Paris',
      updatedAt: currentUser.updatedAt,
      username: currentUser.username,
    };

    expect(userToUpdate).toMatchObject(expectedUser);
  });
});
