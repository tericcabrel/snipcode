import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import React, { Fragment } from 'react';

import { MenuItemAction } from '../../typings/components';
import { classNames } from '../../utils/classnames';

type MenuItemProps = {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
};

type Props = {
  data: MenuItemAction[];
};

const MenuItem = ({ icon, label, onClick }: MenuItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          type="button"
          className={classNames(
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block w-full group flex text-left px-4 py-2 text-sm',
          )}
          onClick={onClick}
        >
          {icon} {label}
        </button>
      )}
    </Menu.Item>
  );
};

const DotMenu = ({ data }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-transparent rounded-full flex items-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {data.map((item) => (
              <MenuItem key={item.label} icon={item.icon} label={item.label} onClick={item.onClick} />
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { DotMenu };
