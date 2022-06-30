import User from '../../entities/user';
import BaseRepository from './_base';

type UserRepositoryInterface = {
  findByEmail: (email: string) => Promise<User | null>;
  findByUsername: (username: string) => Promise<User | null>;
} & BaseRepository<User>;

export default UserRepositoryInterface;
