import { roleService, userService } from '../../index';

export const cleanRoles = async () => {
  const allRoles = await roleService.findAll();

  await roleService.deleteMany(allRoles.map((role) => role.id));
};

export const cleanUsers = async () => {
  const allUsers = await userService.findAll();

  await userService.deleteMany(allUsers.map((user) => user.id));
};
