import BaseRepository from './_base';

type RoleRepositoryInterface<Entity> = {
  findByName: (name: string) => Promise<Entity | null>;
} & BaseRepository<Entity>;

export default RoleRepositoryInterface;
