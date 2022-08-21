import { useBooleanState } from '../../hooks';
import { useListDirectory } from '../../services/folders/list-directory';
import { SnippetItem } from '../../typings/components';
import MenuAction from '../menu-action';
import BreadCrumb from './breadcrumb';
import EmptyFolder from './folders/empty';
import Folder from './folders/folder';
import CreateFolderContainer from './folders/form/create-folder';
import CreateSnippetContainer from './snippets/form/create-snippet';
import Snippet from './snippets/snippet';

type Props = {
  folderId: string;
  onBreadcrumbPathClick: (folderId: string, path: string) => Promise<void>;
  onNavigateToFolder: (folderId: string) => void;
  onSnippetClick: (snippetId: string) => void;
  rootFolderId: string;
  title: string;
};

const Directory = ({
  folderId,
  onBreadcrumbPathClick,
  onNavigateToFolder,
  onSnippetClick,
  rootFolderId,
  title,
}: Props) => {
  const [isNewFolderOpened, openNewFolderModal, closeNewFolderModal] = useBooleanState(false);
  const [isNewSnippetOpened, openNewSnippetModal, closeNewSnippetModal] = useBooleanState(false);

  const { data } = useListDirectory(folderId);

  const isDirectoryEmpty = data && data.folders.length + data.snippets.length === 0;

  const folders = data?.folders ?? [];
  const snippets = data?.snippets ?? [];
  const paths = data?.paths ?? [];

  const goToFolder = (folderId: string) => {
    onNavigateToFolder(folderId);
  };

  const openSnippet = (snippet: SnippetItem) => {
    onSnippetClick(snippet.id);
  };

  const onDeleteSnippet = (snippet: SnippetItem) => {
    console.log('Delete Met', snippet);
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
          <BreadCrumb
            paths={paths}
            current={folderId}
            onPathClick={onBreadcrumbPathClick}
            rootFolderId={rootFolderId}
          />
          {isDirectoryEmpty ? (
            <div className="border-4 border-dashed border-gray-200 rounded-lg flex justify-center items-center py-8 px-0 mt-6 h-96">
              <div className="w-1/2">
                <EmptyFolder handleCreateFolder={openNewFolderModal} handleCreateSnippet={openNewSnippetModal} />
              </div>
            </div>
          ) : (
            <div className="min-h-96">
              <div className="mt-6 grid grid-cols-5 gap-4">
                {folders.map((folder) => (
                  <Folder item={folder} key={folder.id} onNavigate={goToFolder} />
                ))}
              </div>
              <div className="my-8 text-md font-bold text-gray-500">Files</div>
              <div className="mt-6 grid grid-cols-4 gap-4">
                {snippets.map((snippet) => (
                  <Snippet item={snippet} key={snippet.id} onClick={openSnippet} onDeleteClick={onDeleteSnippet} />
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
