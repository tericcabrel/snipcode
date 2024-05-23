import { CreateUserInput } from './create-user-input';
import { User } from '../user.entity';

describe('Test Create User Input', () => {
  it('should return a valid user object without password', () => {
    const input = new CreateUserInput({
      email: 'user@email.com',
      name: 'user admin',
      oauthProvider: 'github',
      pictureUrl: 'pictureUrl',
      roleId: 'roleId',
      timezone: 'Europe/Paris',
      username: 'shuser',
    });

    const user = input.toUser();

    const expectedUser: User = {
      createdAt: expect.any(Date),
      email: 'user@email.com',
      id: expect.any(String),
      isEnabled: false,
      name: 'user admin',
      oauthProvider: 'github',
      password: null,
      pictureUrl: 'pictureUrl',
      roleId: 'roleId',
      timezone: 'Europe/Paris',
      updatedAt: expect.any(Date),
      username: 'shuser',
    };

    expect(user).toMatchObject(expectedUser);
  });

  it('should return a valid user object with a password', () => {
    const input = new CreateUserInput({
      email: 'user@email.com',
      name: 'user admin',
      oauthProvider: 'email',
      password: 'str0ngPassw0rd',
      pictureUrl: 'pictureUrl',
      roleId: 'roleId',
      timezone: 'Europe/Paris',
      username: 'shuser',
    });

    const user = input.toUser();

    const expectedUser: User = {
      createdAt: expect.any(Date),
      email: 'user@email.com',
      id: expect.any(String),
      isEnabled: false,
      name: 'user admin',
      oauthProvider: 'email',
      password: input.hashedPassword,
      pictureUrl: 'pictureUrl',
      roleId: 'roleId',
      timezone: 'Europe/Paris',
      updatedAt: expect.any(Date),
      username: 'shuser',
    };

    expect(user).toMatchObject(expectedUser);
  });
});
