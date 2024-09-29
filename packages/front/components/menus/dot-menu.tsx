import { EllipsisVerticalIcon } from 'lucide-react';
import React, { Fragment } from 'react';

import { cn } from '../../lib/utils';
import { MenuItemAction } from '../../typings/components';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type Props = {
  className?: string;
  data: MenuItemAction[];
};

const DotMenu = ({ className, data }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="w-auto h-auto">
          <EllipsisVerticalIcon size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={cn('w-40', className)} forceMount>
        {data.map(({ icon, label, onClick }, index) => (
          <Fragment key={label}>
            <DropdownMenuItem className="cursor-pointer" onClick={onClick}>
              {icon} {label}
            </DropdownMenuItem>
            {index !== data.length - 1 && <DropdownMenuSeparator />}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { DotMenu };
