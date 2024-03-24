import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, DocumentPlusIcon, FolderPlusIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

type Props = {
  onNewFolderClick: () => void;
  onNewSnippetClick: () => void;
};

const MenuAction = ({ onNewFolderClick, onNewSnippetClick }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          New
          <ChevronDownIcon className="mr-1 ml-2" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 z-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <button
                className="w-full text-gray-700 block px-4 py-2 text-sm hover:text-gray-800 hover:bg-gray-100"
                onClick={onNewSnippetClick}
              >
                <DocumentPlusIcon className="mr-3 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                New Snippet
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                className="w-full text-gray-700 block px-4 py-2 text-sm hover:text-gray-800 hover:bg-gray-100"
                onClick={onNewFolderClick}
              >
                <FolderPlusIcon className="mr-3 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                New Folder
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { MenuAction };
