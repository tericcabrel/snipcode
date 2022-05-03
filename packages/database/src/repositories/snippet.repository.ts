import Snippet, { SnippetVisibility } from '../entities/snippet';
import prisma from '../prisma';
import SnippetRepositoryInterface from './interfaces/snippet';

export default class SnippetRepository implements SnippetRepositoryInterface {
  create(item: Snippet): Promise<Snippet> {
    return prisma.snippet.create({
      data: {
        content: item.content,
        description: item.description,
        folderId: item.folderId,
        id: item.id,
        language: item.language,
        name: item.name,
        size: item.size,
        userId: item.userId,
        visibility: item.visibility,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const snippet = await prisma.snippet.findFirst({ where: { id } });

    if (snippet) {
      await prisma.snippet.delete({ where: { id } });
    }
  }

  findAll(): Promise<Snippet[]> {
    return prisma.snippet.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findById(id: string): Promise<Snippet | null> {
    return prisma.snippet.findUnique({ where: { id } });
  }

  update(id: string, item: Snippet): Promise<Snippet> {
    return prisma.snippet.update({
      data: {
        content: item.content,
        description: item.description,
        folderId: item.folderId,
        language: item.language,
        name: item.name,
        size: item.size,
        visibility: item.visibility,
      },
      where: { id },
    });
  }

  findByUser(userId: string): Promise<Snippet[]> {
    return prisma.snippet.findMany({ orderBy: { name: 'asc' }, where: { userId } });
  }

  findByFolder(folderId: string, visibility?: SnippetVisibility): Promise<Snippet[]> {
    return prisma.snippet.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        folderId,
        visibility,
      },
    });
  }

  findByVisibility(visibility: SnippetVisibility): Promise<Snippet[]> {
    return prisma.snippet.findMany({
      orderBy: { createdAt: 'desc' },
      where: { visibility },
    });
  }
}
