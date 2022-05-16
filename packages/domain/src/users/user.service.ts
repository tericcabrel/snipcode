import { Role, User, UserRepositoryInterface } from '@sharingan/database';

import CreateUserDto from './dtos/create-user-dto';
import UpdateUserDto from './dtos/update-user-dto';

export default class UserService {
  constructor(private _userRepository: UserRepositoryInterface) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this._userRepository.create(createUserDto.toUser());
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this._userRepository.update(id, updateUserDto.toUser());
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

  async findAll(): Promise<User[]> {
    return this._userRepository.findAll();
  }

  async deleteMany(ids: string[]): Promise<void> {
    const promises = ids.map((id) => this._userRepository.delete(id));

    await Promise.all(promises);
  }

  async findById(id: string): Promise<User | null> {
    return this._userRepository.findById(id);
  }
}
