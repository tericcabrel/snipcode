import { CreateUserDto } from '../../../../index';

describe('Test Create User DTO', () => {
  it('should return a valid user object', () => {
    const dto = new CreateUserDto(
      'user@email.com',
      'user',
      'admin',
      'roleId',
      'pictureUrl',
      'Europe/Paris',
      'shuser',
      'password',
    );

    const user = dto.toUser();

    expect(user).toMatchObject({
      email: 'user@email.com',
      firstName: 'user',
      id: expect.any(String),
      lastName: 'admin',
      password: dto.getHashedPassword(),
      pictureUrl: 'pictureUrl',
      roleId: 'roleId',
      timezone: 'Europe/Paris',
      username: 'shuser',
    });
  });
});
