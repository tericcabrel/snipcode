import { useBooleanState } from '../../hooks';
import { FilePath, FolderItem, SnippetItem } from '../../typings/components';
import MenuAction from '../menu-action';
import BreadCrumb from './breadcrumb';
import EmptyFolder from './folders/empty';
import Folder from './folders/folder';
import CreateFolderContainer from './folders/form/create-folder';
import CreateSnippetContainer from './snippets/form/create-snippet';
import Snippet from './snippets/snippet';

type Props = {
  folderId: string;
  title: string;
};

const Directory = ({ folderId, title }: Props) => {
  const [isNewFolderOpened, openNewFolderModal, closeNewFolderModal] = useBooleanState(false);
  const [isNewSnippetOpened, openNewSnippetModal, closeNewSnippetModal] = useBooleanState(false);

  console.log('rootFolderId => ', folderId);

  const folders: FolderItem[] = [
    {
      fileCount: 1,
      id: '1',
      name: 'Projects',
    },
    {
      fileCount: 3,
      id: '2',
      name: 'Gist',
    },
    {
      fileCount: 17,
      id: '3',
      name: 'Blog',
    },
    {
      fileCount: 0,
      id: '4',
      name: 'Local',
    },
    {
      fileCount: 32,
      id: '5',
      name: 'Gist Import',
    },
    {
      fileCount: 6,
      id: '6',
      name: 'Big long annoying folder name',
    },
  ];
  const snippets: SnippetItem[] = [
    {
      folderId: 'fol_one',
      id: '1',
      language: 'typescript',
      name: 'generate-id.ts',
    },
    {
      folderId: 'fol_one',
      id: '2',
      language: 'java',
      name: 'SpringBootApplication.java',
    },
    {
      folderId: 'fol_one',
      id: '3',
      language: 'python',
      name: 'run_main.py',
    },
    {
      folderId: 'fol_one',
      id: '4',
      language: 'csharp',
      name: 'GenerateReport.cs',
    },
    {
      folderId: 'fol_one',
      id: '5',
      language: 'rust',
      name: 'compute_workflow.rs',
    },
  ];
  const paths: FilePath[] = [
    { id: 'projects', name: 'Projects' },
    { id: 'blog', name: 'Blog' },
  ];

  const goToFolder = (folderId: string) => {
    console.log('goToFolder', folderId);
    // TODO router push
  };

  const openFile = (snippet: SnippetItem) => {
    console.log('openFile', snippet);
    // TODO router push
  };

  return (
    <>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-3xl font-bold leading-tight text-gray-900">{title}</div>
          <MenuAction onNewFolderClick={openNewFolderModal} onNewSnippetClick={openNewSnippetModal} />
        </div>
      </header>
      <main>
        <div className="max-w-7xl py-8 mx-auto sm:px-6 lg:px-8">
          {folders.length === 0 ? (
            <div className="border-4 border-dashed border-gray-200 rounded-lg flex justify-center items-center py-8 sm:px-0 h-96">
              <div className="w-1/2">
                <EmptyFolder />
              </div>
            </div>
          ) : (
            <div className="min-h-96">
              <BreadCrumb paths={paths} current={folderId} />
              <div className="mt-6 grid grid-cols-5 gap-4">
                {folders.map((folder) => (
                  <Folder item={folder} key={folder.id} onNavigate={goToFolder} />
                ))}
              </div>
              <div className="my-8 text-md font-bold text-gray-500">Files</div>
              <div className="mt-6 grid grid-cols-4 gap-4">
                {snippets.map((snippet) => (
                  <Snippet item={snippet} key={snippet.id} onClick={openFile} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      {isNewFolderOpened && <CreateFolderContainer closeModal={closeNewFolderModal} parentFolderId={folderId} />}
      <CreateSnippetContainer open={isNewSnippetOpened} closeModal={closeNewSnippetModal} folderId={folderId} />
    </>
  );
};

export default Directory;
