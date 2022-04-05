import { roleService } from '../../../index';

describe('Test Role service', () => {
  it('should load roles in the database', async () => {
    await roleService.loadRoles();

    const allRoles = await roleService.findAll();

    expect(allRoles).toHaveLength(2);
    expect(allRoles.every((role) => ['admin', 'user'].includes(role.name))).toBe(true);
  });
});
