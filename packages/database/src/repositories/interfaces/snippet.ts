import Snippet, { SnippetVisibility } from '../../entities/snippet';
import BaseRepository from './_base';

type SnippetRepositoryInterface = {
  findByFolder: (folderId: string, visibility?: SnippetVisibility) => Promise<Snippet[]>;
  findByUser: (userId: string, visibility?: SnippetVisibility) => Promise<Snippet[]>;
  findByVisibility: (visibility: SnippetVisibility) => Promise<Snippet[]>;
} & BaseRepository<Snippet>;

export default SnippetRepositoryInterface;
