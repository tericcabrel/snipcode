import bcrypt from 'bcryptjs';

export const hashPassword = (password: string): string => {
  const SALT_ROUNDS = 10;

  return bcrypt.hashSync(password, SALT_ROUNDS);
};
