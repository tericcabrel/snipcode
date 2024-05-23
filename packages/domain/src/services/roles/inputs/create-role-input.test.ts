import { CreateRoleInput } from './create-role-input';
import { Role } from '../role.entity';

describe('Test Create Role Input', () => {
  it('should return a valid role object', () => {
    const input = new CreateRoleInput({
      description: 'description admin',
      level: 100,
      name: 'admin',
    });

    const role = input.toRole();

    expect(role).toMatchObject<Role>({
      createdAt: expect.any(Date),
      description: input.description,
      id: expect.any(String),
      level: input.level,
      name: input.name,
      updatedAt: expect.any(Date),
    });
  });
});
