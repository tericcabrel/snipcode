import { PlusIcon } from '@heroicons/react/20/solid';

import { Button } from '../../../forms/button';

type Props = {
  handleCreateFolder: () => void;
  handleCreateSnippet: () => void;
};

const EmptyFolder = ({ handleCreateFolder, handleCreateSnippet }: Props) => {
  return (
    <div className="text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No Files</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by adding a folder or snippet.</p>
      <div className="mt-6 flex flex-col items-center justify-center">
        <Button className="mt-0 w-2/5" color="white-gray" onClick={handleCreateSnippet}>
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Snippet
        </Button>
        <Button className="mt-4 w-2/5" onClick={handleCreateFolder}>
          <PlusIcon className="-ml-1 mr-2" aria-hidden="true" />
          New Folder
        </Button>
      </div>
    </div>
  );
};

export { EmptyFolder };
