import { Role, User, UserRepositoryInterface } from '@sharingan/database';
import SharinganError, { errors } from '@sharingan/utils';
import bcrypt from 'bcrypt';

import CreateUserDto from './dtos/create-user-dto';
import UpdateUserDto from './dtos/update-user-dto';

export default class UserService {
  constructor(private _userRepository: UserRepositoryInterface) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this._userRepository.create(createUserDto.toUser());
  }

  async update(currentUser: User, updateUserDto: UpdateUserDto): Promise<User> {
    return this._userRepository.update(currentUser.id, updateUserDto.toUser(currentUser));
  }

  async loadAdminUsers(role: Role): Promise<void> {
    const userAdminDto = new CreateUserDto({
      email: 'teco@sharingan.dev',
      name: 'Eric Teco',
      oauthProvider: 'github',
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

    await this._userRepository.create(userAdminDto.toUser());
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
      throw new SharinganError(errors.LOGIN_FAILED_EMAIL, 'LOGIN_FAILED');
    }

    const isPasswordValid = user.password ? bcrypt.compareSync(password, user.password) : false;

    if (!isPasswordValid) {
      throw new SharinganError(errors.LOGIN_FAILED_PASSWORD, 'LOGIN_FAILED');
    }

    return user;
  }
}
