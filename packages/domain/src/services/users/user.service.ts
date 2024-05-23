import { Injectable } from '@nestjs/common';
import { SnipcodeError, errors } from '@snipcode/utils';
import bcrypt from 'bcryptjs';
import { generateFromEmail } from 'unique-username-generator';

import { CreateUserInput } from './inputs/create-user-input';
import { UpdateUserInput } from './inputs/update-user-input';
import { User } from './user.entity';
import { CreateUserRootFolderInput } from '../folders/inputs/create-user-root-folder-input';
import { PrismaService } from '../prisma.service';
import { Role } from '../roles/role.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.findByEmail(createUserInput.email);

    if (user) {
      throw new SnipcodeError(errors.EMAIL_ALREADY_TAKEN, 'EMAIL_ALREADY_TAKEN');
    }

    const username = await this.generateUsername(createUserInput.email, createUserInput.username);

    createUserInput.setUsername(username);

    const input = createUserInput.toUser();

    return this.prisma.user.create({
      data: {
        email: input.email,
        id: input.id,
        isEnabled: input.isEnabled,
        name: input.name,
        oauthProvider: input.oauthProvider,
        password: input.password,
        pictureUrl: input.pictureUrl,
        roleId: input.roleId,
        timezone: input.timezone,
        username: input.username,
      },
    });
  }

  async update(currentUser: User, updateUserInput: UpdateUserInput): Promise<User> {
    const input = updateUserInput.toUser(currentUser);

    return this.prisma.user.update({
      data: {
        isEnabled: input.isEnabled,
        name: input.name,
        oauthProvider: input.oauthProvider,
        pictureUrl: input.pictureUrl,
        roleId: input.roleId,
        timezone: input.timezone,
        updatedAt: new Date(),
      },
      where: { id: currentUser.id },
    });
  }

  async loadAdminUser(role: Role, adminPassword: string): Promise<void> {
    const userAdminInput = new CreateUserInput({
      email: 'teco@snipcode.dev',
      name: 'Eric Teco',
      oauthProvider: 'email',
      password: adminPassword,
      pictureUrl: null,
      roleId: role.id,
      timezone: 'Europe/Paris',
      username: 'teco',
    });

    userAdminInput.isEnabled = true;

    const userAdmin = await this.findByEmail(userAdminInput.email);

    if (userAdmin) {
      return;
    }

    const userInput = userAdminInput.toUser();

    const user = await this.prisma.user.create({
      data: {
        email: userInput.email,
        id: userInput.id,
        isEnabled: userInput.isEnabled,
        name: userInput.name,
        oauthProvider: userInput.oauthProvider,
        password: userInput.password,
        pictureUrl: userInput.pictureUrl,
        roleId: userInput.roleId,
        timezone: userInput.timezone,
        username: userInput.username,
      },
    });

    const createUserRootFolderInput = new CreateUserRootFolderInput(user.id);

    const folderInput = createUserRootFolderInput.toFolder();

    await this.prisma.folder.create({
      data: {
        id: folderInput.id,
        name: folderInput.name,
        parentId: folderInput.parentId,
        userId: folderInput.userId,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new SnipcodeError(errors.LOGIN_FAILED, 'LOGIN_FAILED');
    }

    const isPasswordValid = user.password ? bcrypt.compareSync(password, user.password) : false;

    if (!isPasswordValid) {
      throw new SnipcodeError(errors.LOGIN_FAILED, 'LOGIN_FAILED');
    }

    if (!user.isEnabled) {
      throw new SnipcodeError(errors.ACCOUNT_DISABLED, 'ACCOUNT_DISABLED');
    }

    return user;
  }

  private async generateUsername(email: string, username: string | null): Promise<string> {
    if (!username) {
      return generateFromEmail(email, 3);
    }

    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return username;
    }

    return generateFromEmail(email, 3);
  }
}
