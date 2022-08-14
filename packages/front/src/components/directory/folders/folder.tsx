import { FolderIcon } from '@heroicons/react/solid';

import { FolderItem } from '../../../typings/components';
import { displayItemLabel, truncate } from '../../../utils/text';

type Props = {
  item: FolderItem;
  onNavigate: (folderId: string) => void;
};

const FOLDER_NAME_MAX_LENGTH = 20;

const Folder = ({ item, onNavigate }: Props) => {
  const handleDoubleClick = () => {
    onNavigate(item.id);
  };

  return (
    <div
      className="relative block pb-4 px-4 border border-gray-100 shadow-sm rounded-md cursor-default bg-white hover:bg-gray-100 transition"
      onDoubleClick={handleDoubleClick}
      title={item.name}
    >
      <div className="mt-4 text-gray-500 sm:pr-8">
        <FolderIcon className="h-6 w-6" />
        <div className="mt-4 text-base font-bold text-gray-900">{truncate(item.name, FOLDER_NAME_MAX_LENGTH)}</div>
        <p className="hidden mt-2 text-sm sm:block">{displayItemLabel(item.fileCount, 'item')}</p>
      </div>
    </div>
  );
};

export default Folder;
