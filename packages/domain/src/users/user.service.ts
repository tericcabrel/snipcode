import * as bcrypt from 'bcryptjs';
import { getEnv } from '@sharingan/utils';
import { Role, User, UserRepository } from '@sharingan/database';
import CreateUserDto from './dtos/create-user-dto';

export default class UserService {
  constructor(private _userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this._userRepository.create(createUserDto.toUser());
  }

  async isPasswordMatch(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, hashedPassword);
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this._userRepository.findByEmail(username);

    if (!user) {
      throw new Error('User not found.');
    }

    const isValid = await this.isPasswordMatch(password, user.password ?? '');

    if (!isValid) {
      throw new Error("password doesn't match.");
    }

    return user;
  }

  async loadAdminUsers(role: Role): Promise<void> {
    const adminPassword = getEnv('ADMIN_PASSWORD');

    const userAdminDto = new CreateUserDto(
      'teco@sharingan.dev',
      'Eric',
      'Teco',
      role.id,
      null,
      'Europe/Paris',
      'teco',
      adminPassword,
    );

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

  async findAll(): Promise<User[]> {
    return this._userRepository.findAll();
  }

  async deleteMany(ids: string[]): Promise<void> {
    const promises = ids.map((id) => this._userRepository.delete(id));

    await Promise.all(promises);
  }
}
