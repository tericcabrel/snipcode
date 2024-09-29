import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const generateInitials = (name?: string | null) => {
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
