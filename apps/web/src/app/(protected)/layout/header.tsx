'use client';

import { Disclosure, Menu, Transition } from '@snipcode/front';
import { Link } from '@snipcode/front/components/link';
import { UserAvatar } from '@snipcode/front/components/user-avatar';
import { LogoIcon, LogoLightIcon, MenuIcon, XIcon } from '@snipcode/front/icons';
import { useLogoutUser } from '@snipcode/front/services';
import { classNames } from '@snipcode/front/utils/classnames';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import { useAuth } from '@/hooks/authentication/use-auth';

const navigation = [
  { current: true, href: '/app/home', name: 'Home' },
  { current: false, href: '/app/browse', name: 'Browse' },
  /*{ current: false, href: '#', name: 'Favorites' },
  { current: false, href: '#', name: 'Editor' },*/
];

const isActive = (appPath: string, linkPath: string) => {
  return appPath.startsWith(linkPath);
};

export const Header = () => {
  const [logoutUserMutation] = useLogoutUser();
  const { deleteToken, redirectToHome, user } = useAuth();
  const pathname = usePathname();

  const logout = async () => {
    await logoutUserMutation({
      onCompleted: async () => {
        await deleteToken();
        redirectToHome();
      },
    });
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <LogoLightIcon className="block lg:hidden h-8 w-auto" />
                  <LogoIcon className="hidden lg:block h-8 w-auto" />
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                      className={classNames(
                        isActive(pathname, item.href)
                          ? 'border-gray-900 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                      )}
                      href={item.href}
                      key={item.name}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <UserAvatar name={user?.name} url={user?.pictureUrl} />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Link
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-800 hover:bg-gray-100"
                        href="/app/profile"
                      >
                        Profile
                      </Link>
                      <Menu.Item>
                        <button
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:text-gray-800 hover:bg-gray-100"
                          onClick={logout}
                        >
                          Sign out
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon aria-hidden="true" className="block h-6 w-6" />
                  ) : (
                    <MenuIcon aria-hidden="true" className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  aria-current={item.current ? 'page' : undefined}
                  as="a"
                  className={classNames(
                    item.current
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                  )}
                  href={item.href}
                  key={item.name}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <UserAvatar name={user?.name} url={user?.pictureUrl} />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  href="/app/profile"
                >
                  Profile
                </Link>
                <Disclosure.Button
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  onClick={logout}
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
