import { customAlphabet } from 'nanoid';

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&';

export const generateUUID = (length = 12) => {
  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
};
