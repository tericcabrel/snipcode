import BaseRepository from './_base';
import User from '../../entities/user';

type UserRepositoryInterface = {
  findByEmail: (email: string) => Promise<User | null>;
  updatePassword: (id: string, newPassword: string) => Promise<User>;
} & BaseRepository<User>;

export default UserRepositoryInterface;
