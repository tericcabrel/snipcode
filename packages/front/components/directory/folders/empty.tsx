import { FolderPlusIcon, PlusIcon } from 'lucide-react';

import { Button } from '../../ui/button';

type Props = {
  handleCreateFolder: () => void;
  handleCreateSnippet: () => void;
};

export const EmptyFolder = ({ handleCreateFolder, handleCreateSnippet }: Props) => {
  return (
    <div className="text-center">
      <FolderPlusIcon size={32} className="mx-auto text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No Files</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by adding a folder or snippet.</p>
      <div className="mt-6 flex flex-col items-center justify-center">
        <Button className="mt-0 w-2/5" onClick={handleCreateSnippet}>
          <PlusIcon className="-ml-1 mr-2" aria-hidden="true" />
          New Snippet
        </Button>
        <Button variant="secondary" className="mt-4 w-2/5" onClick={handleCreateFolder}>
          <PlusIcon className="-ml-1 mr-2" aria-hidden="true" />
          New Folder
        </Button>
      </div>
    </div>
  );
};
