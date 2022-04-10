import Role, { RoleName } from '../../entities/role';
import BaseRepository from './_base';

type RoleRepositoryInterface = {
  findByName: (name: RoleName) => Promise<Role | null>;
} & BaseRepository<Role>;

export default RoleRepositoryInterface;
