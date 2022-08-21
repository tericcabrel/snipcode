import { FolderIcon, FolderOpenIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid';

import { useHover } from '../../../hooks/use-hover';
import { FolderItem, MenuItemAction } from '../../../typings/components';
import { displayItemLabel, truncate } from '../../../utils/text';
import { DotMenu } from '../../menus/dot-menu';

type Props = {
  item: FolderItem;
  onDeleteClick: (snippet: FolderItem) => void;
  onNavigate: (folderId: string) => void;
  onRenameClick: (snippet: FolderItem) => void;
};

const FOLDER_NAME_MAX_LENGTH = 20;

const Folder = ({ item, onDeleteClick, onNavigate, onRenameClick }: Props) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  const handleDoubleClick = () => {
    onNavigate(item.id);
  };

  const menuActions: MenuItemAction[] = [
    {
      icon: <FolderOpenIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
      label: 'Open',
      onClick: handleDoubleClick,
    },
    {
      icon: <PencilAltIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
      label: 'Rename',
      onClick: () => onRenameClick(item),
    },
    {
      icon: <TrashIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
      label: 'Delete',
      onClick: () => onDeleteClick(item),
    },
  ];

  return (
    <div
      className="relative block pb-4 px-4 border border-gray-100 shadow-sm rounded-md cursor-default bg-white hover:bg-gray-100 transition"
      onDoubleClick={handleDoubleClick}
      title={item.name}
      ref={hoverRef}
    >
      <div className="mt-4 text-gray-500">
        <div className="flex justify-between items-center">
          <FolderIcon className="h-6 w-6" />
          {isHovered && <DotMenu data={menuActions} />}
        </div>
        <div className="mt-4 text-base font-bold text-gray-900">{truncate(item.name, FOLDER_NAME_MAX_LENGTH)}</div>
        <p className="hidden mt-2 text-sm sm:block">{displayItemLabel(item.fileCount, 'item')}</p>
      </div>
    </div>
  );
};

export default Folder;
