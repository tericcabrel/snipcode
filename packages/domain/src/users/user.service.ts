import { Role, User, UserRepository } from '@sharingan/database';
import CreateUserDto from './dtos/create-user-dto';

export default class UserService {
  constructor(private _userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this._userRepository.create(createUserDto.toUser());
  }

  async loadAdminUsers(role: Role): Promise<void> {
    const userAdminDto = new CreateUserDto(
      'teco@sharingan.dev',
      'Eric',
      'Teco',
      role.id,
      '<access_token>',
      'github',
      null,
      'Europe/Paris',
      'teco',
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

  async findByToken(token: string): Promise<User | null> {
    return this._userRepository.findByToken(token);
  }
}
