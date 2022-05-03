import Folder from '../entities/folder';
import prisma from '../prisma';
import FolderRepositoryInterface from './interfaces/folder';

export default class FolderRepository implements FolderRepositoryInterface {
  create(item: Folder): Promise<Folder> {
    return prisma.folder.create({
      data: {
        id: item.id,
        name: item.name,
        parentId: item.parentId,
        userId: item.userId,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const folder = await prisma.folder.findFirst({ where: { id } });

    if (folder) {
      await prisma.folder.delete({ where: { id } });
    }
  }

  findAll(): Promise<Folder[]> {
    return prisma.folder.findMany({ orderBy: { name: 'asc' } });
  }

  findById(id: string): Promise<Folder | null> {
    return prisma.folder.findUnique({ where: { id } });
  }

  update(id: string, item: Folder): Promise<Folder> {
    return prisma.folder.update({
      data: {
        isFavorite: item.isFavorite,
        name: item.name,
        parentId: item.parentId,
      },
      where: { id },
    });
  }

  findByUser(userId: string): Promise<Folder[]> {
    return prisma.folder.findMany({ orderBy: { name: 'asc' }, where: { userId } });
  }
}
