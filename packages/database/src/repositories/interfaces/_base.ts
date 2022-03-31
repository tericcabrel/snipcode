type BaseRepository<Entity> = {
  create: (item: Entity) => Promise<Entity>;
  delete: (id: string) => Promise<void>;
  findAll: () => Promise<Entity[]>;
  findById: (id: string) => Promise<Entity | null>;
  update: (id: string, item: Entity) => Promise<Entity>;
};
export default BaseRepository;
