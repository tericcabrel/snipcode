import Image from 'next/image';

import { COLORS } from '../utils/constants';

type Props = {
  name?: string | null;
  url?: string | null;
};

const generateInitials = (name?: string | null) => {
  if (!name) {
    return 'JD';
  }

  const nameArray = name.trim().split(' ');

  const [firstName, secondName] = nameArray;

  const initials = [firstName, secondName]
    .filter(Boolean)
    .map((name) => name.charAt(0))
    .join('');

  return initials.toUpperCase();
};

const UserAvatar = ({ name, url }: Props) => {
  if (url) {
    return <Image className="h-8 w-8 rounded-full" src={url} alt="User picture" width={40} height={40} />;
  }

  const initials = generateInitials(name);

  const charIndex = initials.charCodeAt(0) - 65;
  const colorIndex = charIndex % COLORS.length;

  return (
    <span
      className="inline-flex items-center justify-center h-10 w-10 rounded-full"
      style={{ backgroundColor: COLORS[colorIndex] }}
    >
      <span className="font-medium leading-none text-white">{initials}</span>
    </span>
  );
};

export default UserAvatar;
