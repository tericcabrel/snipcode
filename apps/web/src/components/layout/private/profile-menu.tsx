import { useClickOutside } from '@/hooks/use-click-outside';
import { useCustomRef } from '@/hooks/use-custom-ref';

type Props = {
  closeModal: () => void;
  handleLogout: () => void;
};

const ProfileMenu = ({ closeModal, handleLogout }: Props) => {
  const ref = useCustomRef<any>();

  useClickOutside(ref, () => closeModal());

  return (
    <ul
      className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md"
      aria-label="submenu"
      ref={ref}
      data-testid="account-menu-list"
    >
      <li className="flex">
        <a
          className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md"
          href="#"
          onClick={handleLogout}
        >
          <span>Log out</span>
        </a>
      </li>
    </ul>
  );
};

export default ProfileMenu;
