import * as bcrypt from 'bcryptjs';

/**
 * Hashing password
 * @param password plain text password
 * @returns hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * check if two passwords are the same
 * @param password
 * @param hashedPassword
 * @returns true if passwords are the same, false otherwise
 */
export const isHashMatch = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
