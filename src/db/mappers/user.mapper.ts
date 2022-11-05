import { getPrismaClient } from '../prisma';

export const getUserByUsername = (username: string) => {
  return getPrismaClient().user.findUnique({ where: { username } });
};

export const getUserById = (id: string) => {
  return getPrismaClient().user.findUnique({ where: { id } });
};
