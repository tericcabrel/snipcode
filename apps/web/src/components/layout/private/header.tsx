import { useState } from 'react';
import router from 'next/router';
import { AuthenticatedUser } from '@/typings/queries';
import ProfileMenu from '@/components/layout/private/profile-menu';
import { useLogoutUser } from '@/services/users/logout-user';

type Props = {
  user: AuthenticatedUser;
};

const PrivateHeader = ({ user }: Props) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [logoutUserMutation] = useLogoutUser();

  const toggleProfileMenuOpen = () => {
    setIsProfileMenuOpen((prevValue) => !prevValue);
  };

  const logout = async () => {
    await logoutUserMutation();

    await router.push('/');
  };

  return (
    <header className="z-10 py-4 px-10 bg-white shadow-md dark:bg-gray-800">
      <div className="container flex items-center justify-end h-full px-6 mx-auto text-blue-600">
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            <button
              className="items-center flex rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={toggleProfileMenuOpen}
              aria-label="Account"
              aria-haspopup="true"
              data-testid="btn-account-menu"
            >
              <div className="mr-2">{user.name}</div>
            </button>
            {isProfileMenuOpen && <ProfileMenu closeModal={toggleProfileMenuOpen} handleLogout={logout} />}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default PrivateHeader;
