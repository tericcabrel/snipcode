import prisma, { PrismaClient } from './src/prisma';
import dbId from './src/utils/id';
import User, { OauthProvider } from './src/entities/user';
import Role, { RoleName } from './src/entities/role';
import RoleRepository from './src/repositories/role.repository';
import UserRepository from './src/repositories/user.repository';

export { prisma as dbClient, PrismaClient };
export { dbId };
export type { Role, RoleName, User, OauthProvider };
export { RoleRepository, UserRepository };
