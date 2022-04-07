import { CreateRoleDto } from '../../../../index';

describe('Test Create Role DTO', () => {
  it('should return a valid role object', () => {
    const dto = new CreateRoleDto('admin', 100, 'description admin');

    const role = dto.toRole();

    expect(role).toMatchObject({
      description: 'description admin',
      id: expect.any(String),
      level: 100,
      name: 'admin',
    });
  });
});
