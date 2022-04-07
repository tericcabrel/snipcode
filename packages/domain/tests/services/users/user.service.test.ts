import { roleService, userService } from '../../../index';
import { cleanRoles, cleanUsers } from '../../setup/test-utils';

describe('Test User service', () => {
  beforeAll(async () => {
    await roleService.loadRoles();
  });

  it('should load users in the database', async () => {
    const [roleAdmin] = await roleService.findAll();

    await userService.loadAdminUsers(roleAdmin);

    const adminUser = await userService.findByEmail('teco@sharingan.dev');

    expect(adminUser).toBeDefined();
  });

  afterAll(async () => {
    await cleanUsers();
    await cleanRoles();
  });
});
