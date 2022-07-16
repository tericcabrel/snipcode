import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid';

import { FilePath } from '../../typings/components';
import Link from '../link';

type Props = {
  current: string;
  paths: FilePath[];
};

const BreadCrumb = ({ current, paths }: Props) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <Link href="/home">
            <a className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </Link>
        </li>
        {paths.map((path) => (
          <li key={path.id}>
            <Link href={`/folders/${path.id}`}>
              <a
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={path.id === current ? 'page' : undefined}
              >
                <div className="flex items-center">
                  <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400 mr-4" aria-hidden="true" />
                  <span>{path.name}</span>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
