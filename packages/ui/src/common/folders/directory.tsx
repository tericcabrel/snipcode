import { FilePath, FolderItem, SnippetItem } from '../../typings/components';
import BreadCrumb from './breadcrumb';
import EmptyFolder from './empty';
import Folder from './folder';
import Snippet from './snippet';

type Props = {
  folderId: string;
};

const Directory = ({ folderId }: Props) => {
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
    </>
  );
};

export default Directory;
