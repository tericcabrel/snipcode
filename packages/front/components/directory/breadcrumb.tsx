import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';

import { classNames } from '../../lib/classnames';
import { FilePath } from '../../typings/components';

type Props = {
  current: string;
  onPathClick: (folderId: string, path: string) => Promise<void>;
  paths: FilePath[];
  rootFolderId: string;
};

type BreadcrumbItemProps = {
  isCurrent: boolean;
  isHome: boolean;
  label: string;
};

const BreadcrumbItem = ({ isCurrent, isHome, label }: BreadcrumbItemProps) => {
  const classes = classNames(
    'text-sm font-medium hover:text-gray-700',
    isCurrent ? 'text-gray-700' : 'text-gray-500',
    isCurrent ? 'cursor-default' : 'cursor-pointer',
  );

  return (
    <div className={classes}>
      <div className="flex items-center">
        {isHome ? (
          <HomeIcon className="flex-shrink-0" aria-hidden="true" />
        ) : (
          <ChevronRightIcon className="flex-shrink-0 text-gray-400 mr-4" aria-hidden="true" />
        )}
        <span className={isHome ? 'sr-only' : ''}>{label}</span>
      </div>
    </div>
  );
};

const BreadCrumb = ({ current, onPathClick, paths, rootFolderId }: Props) => {
  const onItemClick = async (folderId: string, path?: string) => {
    if (!path || current === folderId) {
      return;
    }

    await onPathClick(folderId, path);
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li onClick={() => onItemClick(rootFolderId, '/app/home')}>
          <BreadcrumbItem isCurrent={current === rootFolderId} isHome label="Home" />
        </li>
        {paths.map((path) => (
          <li key={path.id} onClick={() => onItemClick(path.id, `/app/folders/${path.id}`)}>
            <BreadcrumbItem isCurrent={current === path.id} isHome={false} label={path.name} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export { BreadCrumb };
