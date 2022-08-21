import { ClipboardIcon, CodeIcon, DocumentIcon, PencilAltIcon, ShareIcon, TrashIcon } from '@heroicons/react/solid';
import React from 'react';

import { useCopyToClipboard } from '../../../hooks/use-copy-to-clipboard';
import { MenuItemAction, SnippetItem } from '../../../typings/components';
import { COLORS } from '../../../utils/constants';
import { generateEmbeddableLink, generateShareableLink } from '../../../utils/snippets';
import { truncate } from '../../../utils/text';
import { DotMenu } from '../../menus/dot-menu';

type Props = {
  item: SnippetItem;
  onClick: (snippet: SnippetItem) => void;
  onDeleteClick: (snippet: SnippetItem) => void;
};

const FILE_NAME_MAX_LENGTH = 30;

const Snippet = ({ item, onClick, onDeleteClick }: Props) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const charIndex = item.language.charCodeAt(0) - 65;
  const colorIndex = charIndex % COLORS.length;

  const handleCopyShareableLink = async () => {
    const link = generateShareableLink(item.id);

    await copyToClipboard(link);
  };

  const handleEmbeddableLink = async () => {
    const link = generateEmbeddableLink(item.id);

    await copyToClipboard(link);
  };

  const handleCopyToClipboard = async () => {
    const { content } = item;

    await copyToClipboard(content);
  };

  const menuActions: MenuItemAction[] = [
    {
      icon: <PencilAltIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
      label: 'Edit',
      onClick: () => onClick(item),
    },
    {
      icon: <ShareIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
      label: 'Copy shareable link',
      onClick: handleCopyShareableLink,
    },
    {
      icon: <CodeIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
      label: 'Copy embeddable link',
      onClick: handleEmbeddableLink,
    },
    {
      icon: <ClipboardIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />,
      label: 'Copy to clipboard',
      onClick: handleCopyToClipboard,
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
      title={item.name}
    >
      <div className="mt-4 text-gray-500 flex items-center justify-between">
        <div className="flex items-center">
          <DocumentIcon className="h-6 w-6 mr-2" style={{ color: COLORS[colorIndex] }} />
          <div className="text-sm font-bold text-gray-900 cursor-pointer" onClick={() => onClick(item)}>
            {truncate(item.name, FILE_NAME_MAX_LENGTH)}
          </div>
        </div>
        <DotMenu data={menuActions} />
      </div>
    </div>
  );
};

export default Snippet;
