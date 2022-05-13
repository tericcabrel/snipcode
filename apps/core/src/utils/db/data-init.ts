import { roleService, userService } from '@sharingan/domain';

export const loadData = async () => {
  await roleService.loadRoles();

  const adminRole = await roleService.findByName('admin');

  if (!adminRole) {
    throw new Error('[Data Loader]: Role administrator not found');
  }

  await userService.loadAdminUsers(adminRole);
};
