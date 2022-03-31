import BaseRepository from './_base';

type UserRepositoryInterface<Entity> = {
  findByEmail: (email: string) => Promise<Entity | null>;
  updatePassword: (id: string, newPassword: string) => Promise<Entity>;
} & BaseRepository<Entity>;

export default UserRepositoryInterface;
