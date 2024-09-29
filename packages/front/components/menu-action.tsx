import { ChevronsUpDownIcon, FilePlusIcon, FolderPlusIcon } from 'lucide-react';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type Props = {
  onNewFolderClick: () => void;
  onNewSnippetClick: () => void;
};

export const MenuAction = ({ onNewFolderClick, onNewSnippetClick }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          New <ChevronsUpDownIcon size={16} className="mr-1 ml-2" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" forceMount>
        <DropdownMenuItem className="cursor-pointer py-2" onClick={onNewSnippetClick}>
          <FilePlusIcon size={18} className="mx-2" />
          New Snippet
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer py-2" onClick={onNewFolderClick}>
          <FolderPlusIcon size={18} className="mx-2" />
          New Folder
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
