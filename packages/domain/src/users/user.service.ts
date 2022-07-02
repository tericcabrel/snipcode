import { Role, User, dbClient } from '@sharingan/database';
import SharinganError, { errors } from '@sharingan/utils';
import bcrypt from 'bcryptjs';
import { generateFromEmail } from 'unique-username-generator';

import CreateUserRootFolderDto from '../folders/dtos/create-user-root-folder-dto';
import CreateUserDto from './dtos/create-user-dto';
import UpdateUserDto from './dtos/update-user-dto';

export default class UserService {
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findByEmail(createUserDto.email);

    if (user) {
      throw new SharinganError(errors.EMAIL_ALREADY_TAKEN, 'EMAIL_ALREADY_TAKEN');
    }

    const username = await this.generateUsername(createUserDto.email, createUserDto.username);

    createUserDto.setUsername(username);

    const input = createUserDto.toUser();

    return dbClient.user.create({
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

  async update(currentUser: User, updateUserDto: UpdateUserDto): Promise<User> {
    const input = updateUserDto.toUser(currentUser);

    return dbClient.user.update({
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
    const userAdminDto = new CreateUserDto({
      email: 'teco@sharingan.dev',
      name: 'Eric Teco',
      oauthProvider: 'email',
      password: adminPassword,
      pictureUrl: null,
      roleId: role.id,
      timezone: 'Europe/Paris',
      username: 'teco',
    });

    userAdminDto.isEnabled = true;

    const userAdmin = await this.findByEmail(userAdminDto.email);

    if (userAdmin) {
      return;
    }

    const userInput = userAdminDto.toUser();

    const user = await dbClient.user.create({
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

    const createUserRootFolderDto = new CreateUserRootFolderDto(user.id);

    const folderInput = createUserRootFolderDto.toFolder();

    await dbClient.folder.create({
      data: {
        id: folderInput.id,
        name: folderInput.name,
        parentId: folderInput.parentId,
        userId: folderInput.userId,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return dbClient.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return dbClient.user.findUnique({ where: { id } });
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new SharinganError(errors.LOGIN_FAILED, 'LOGIN_FAILED');
    }

    const isPasswordValid = user.password ? bcrypt.compareSync(password, user.password) : false;

    if (!isPasswordValid) {
      throw new SharinganError(errors.LOGIN_FAILED, 'LOGIN_FAILED');
    }

    if (!user.isEnabled) {
      throw new SharinganError(errors.ACCOUNT_DISABLED, 'ACCOUNT_DISABLED');
    }

    return user;
  }

  private async generateUsername(email: string, username: string | null): Promise<string> {
    if (!username) {
      return generateFromEmail(email, 3);
    }

    const user = await dbClient.user.findFirst({
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
