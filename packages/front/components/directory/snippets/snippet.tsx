import { ClipboardIcon, CodeXmlIcon, FileIcon, PencilIcon, ShareIcon, TrashIcon } from 'lucide-react';
import React from 'react';

import { useCopyToClipboard } from '../../../hooks/use-copy-to-clipboard';
// import { useHover } from '../../../hooks/use-hover';
import { truncate } from '../../../lib/text';
import { MenuItemAction, SnippetItem } from '../../../typings/components';
import { DotMenu } from '../../menus/dot-menu';

type Props = {
  embeddableHostUrl: string;
  item: SnippetItem;
  onClick: (snippet: SnippetItem) => void;
  onDeleteClick: (snippet: SnippetItem) => void;
  shareableHostUrl: string;
};

const FILE_NAME_MAX_LENGTH = 30;

export const Snippet = ({ embeddableHostUrl, item, onClick, onDeleteClick, shareableHostUrl }: Props) => {
  // const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopyShareableLink = async () => {
    const link = `${shareableHostUrl}/snippets/${item.id}`;

    await copyToClipboard(link);
  };

  const handleEmbeddableLink = async () => {
    const link = `${embeddableHostUrl}/${item.id}`;

    await copyToClipboard(link);
  };

  const handleCopyToClipboard = async () => {
    const { content } = item;

    await copyToClipboard(content);
  };

  const menuActions: MenuItemAction[] = [
    {
      icon: <PencilIcon size={16} className="mr-3 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
      label: 'Edit',
      onClick: () => onClick(item),
    },
    {
      icon: <ShareIcon size={16} className="mr-3 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
      label: 'Copy shareable link',
      onClick: handleCopyShareableLink,
    },
    {
      icon: <CodeXmlIcon size={16} className="mr-3 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
      label: 'Copy embeddable link',
      onClick: handleEmbeddableLink,
    },
    {
      icon: <ClipboardIcon size={16} className="mr-3 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
      label: 'Copy to clipboard',
      onClick: handleCopyToClipboard,
    },
    {
      icon: <TrashIcon size={16} className="mr-3 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
      label: 'Delete',
      onClick: () => onDeleteClick(item),
    },
  ];

  return (
    <div
      className="relative block pb-4 px-4 border border-gray-100 shadow-sm rounded-md cursor-default bg-white hover:bg-gray-100 transition"
      title={item.name}
      // ref={hoverRef}
    >
      <div className="mt-4 text-gray-500 flex items-center justify-between">
        <div className="flex items-center">
          <FileIcon className="h-6 w-6 mr-2" />
          <div className="text-sm font-bold text-gray-900 cursor-pointer" onClick={() => onClick(item)}>
            {truncate(item.name, FILE_NAME_MAX_LENGTH)}
          </div>
        </div>
        {/*{isHovered && <DotMenu data={menuActions} />}*/}
        <DotMenu data={menuActions} className="w-56" />
      </div>
    </div>
  );
};
