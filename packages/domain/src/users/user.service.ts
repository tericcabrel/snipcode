import { FolderRepositoryInterface, Role, User, UserRepositoryInterface } from '@sharingan/database';
import SharinganError, { errors } from '@sharingan/utils';
import bcrypt from 'bcrypt';
import { generateFromEmail } from 'unique-username-generator';

import CreateUserRootFolderDto from '../folders/dtos/create-user-root-folder-dto';
import CreateUserDto from './dtos/create-user-dto';
import UpdateUserDto from './dtos/update-user-dto';

export default class UserService {
  constructor(private _userRepository: UserRepositoryInterface, private _folderRepository: FolderRepositoryInterface) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this._userRepository.findByEmail(createUserDto.email);

    if (user) {
      throw new SharinganError(errors.EMAIL_ALREADY_TAKEN, 'EMAIL_ALREADY_TAKEN');
    }

    const username = await this.generateUsername(createUserDto.email, createUserDto.username);

    createUserDto.setUsername(username);

    return this._userRepository.create(createUserDto.toUser());
  }

  async update(currentUser: User, updateUserDto: UpdateUserDto): Promise<User> {
    return this._userRepository.update(currentUser.id, updateUserDto.toUser(currentUser));
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

    const userAdmin = await this._userRepository.findByEmail(userAdminDto.email);

    if (userAdmin) {
      return;
    }

    const user = await this._userRepository.create(userAdminDto.toUser());

    const createUserRootFolderDto = new CreateUserRootFolderDto(user.id);

    await this._folderRepository.create(createUserRootFolderDto.toFolder());
  }

  async findByEmail(email: string): Promise<User | null> {
    return this._userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this._userRepository.findById(id);
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

    const user = await this._userRepository.findByUsername(username);

    if (!user) {
      return username;
    }

    return generateFromEmail(email, 3);
  }
}
