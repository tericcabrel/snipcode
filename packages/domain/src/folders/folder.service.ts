import { Folder, FolderRepository } from '@sharingan/database';
import CreateFolderDto from './dtos/create-folder-dto';
import CreateUserRootFolderDto from './dtos/create-user-root-folder-dto';

export default class FolderService {
  constructor(private folderRepository: FolderRepository) {}

  async createUserRootFolder(dto: CreateUserRootFolderDto): Promise<void> {
    await this.folderRepository.create(dto.toFolder());
  }

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    return this.folderRepository.create(createFolderDto.toFolder());
  }

  async findUserFolders(userId: string): Promise<Folder[]> {
    return this.folderRepository.findByUser(userId);
  }
}
