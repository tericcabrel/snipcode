import { Avatar, AvatarFallback, AvatarImage } from '@snipcode/front/components/ui/avatar';
import { Button } from '@snipcode/front/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@snipcode/front/components/ui/dropdown-menu';
import { LogoIcon, LogoLightIcon } from '@snipcode/front/icons';
import { classNames } from '@snipcode/front/lib/classnames';
import { COLORS } from '@snipcode/front/lib/constants';
import { useLogoutUser } from '@snipcode/front/services';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/hooks/authentication/use-auth';
import { generateInitials } from '@/lib/utils';

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

  const initials = generateInitials(user?.name);

  const charIndex = initials.charCodeAt(0) - 65;
  const colorIndex = charIndex % COLORS.length;

  const logout = async () => {
    await logoutUserMutation({
      onCompleted: async () => {
        await deleteToken();
        redirectToHome();
      },
    });
  };

  return (
    <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <LogoLightIcon className="block lg:hidden h-8 w-auto" />
            <LogoIcon className="hidden lg:block h-8 w-auto" />
          </div>
          <nav className="flex items-center space-x-4 lg:space-x-6 sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            {navigation.map((item) => (
              <Link
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                className={classNames(
                  isActive(pathname, item.href)
                    ? 'border-gray-900'
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300 text-muted-foreground',
                  'text-sm font-medium transition-colors hover:text-primary',
                )}
                href={item.href}
                key={item.name}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="relative h-10 w-10 rounded-full" variant="ghost">
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt={`@${user?.username}`} src={user?.pictureUrl ?? undefined} />
                    <AvatarFallback className="text-white" style={{ backgroundColor: COLORS[colorIndex] }}>
                      {generateInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">@{user?.username}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link className="w-full" href="/app/profile">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
