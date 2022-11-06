import bcrypt from 'bcrypt';

export const hash = (text: string) => bcrypt.hash(text, 10);
export const compare = (text: string, encrypted: string) => bcrypt.compare(text, encrypted);
