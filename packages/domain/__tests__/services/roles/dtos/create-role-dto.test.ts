import { Role } from '@sharingan/database';

import { CreateRoleDto } from '../../../../index';

describe('Test Create Role DTO', () => {
  it('should return a valid role object', () => {
    const dto = new CreateRoleDto({
      description: 'description admin',
      level: 100,
      name: 'admin',
    });

    const role = dto.toRole();

    expect(role).toMatchObject<Role>({
      createdAt: expect.any(Date),
      description: dto.description,
      id: expect.any(String),
      level: dto.level,
      name: dto.name,
      updatedAt: expect.any(Date),
    });
  });
});
