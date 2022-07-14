import Image from 'next/image';

type Props = {
  name?: string | null;
  url?: string | null;
};

const colors: string[] = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#95a5a6',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#bdc3c7',
  '#7f8c8d',
];

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
  const colorIndex = charIndex % colors.length;

  return (
    <span
      className="inline-flex items-center justify-center h-10 w-10 rounded-full"
      style={{ backgroundColor: colors[colorIndex] }}
    >
      <span className="font-medium leading-none text-white">{initials}</span>
    </span>
  );
};

export default UserAvatar;
