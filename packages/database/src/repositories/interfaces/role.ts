import BaseRepository from './_base';
import Role, { RoleName } from '../../entities/role';

type RoleRepositoryInterface = {
  findByName: (name: RoleName) => Promise<Role | null>;
} & BaseRepository<Role>;

export default RoleRepositoryInterface;
