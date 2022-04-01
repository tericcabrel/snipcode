import prisma from './src/prisma';
import dbId from './src/utils/id';
import User from './src/entities/user';
import Role from './src/entities/role';
import RoleRepository from './src/repositories/role.repository';
import UserRepository from './src/repositories/user.repository';

export { prisma as dbClient };
export { dbId };
export type { Role, User };
export { RoleRepository, UserRepository };
