import { getPrismaClient } from '../prisma';

export const getPersonByUserId = async (userId: string) => {
  return getPrismaClient().person.findFirst({
    where: {
      Users: { every: { id: userId } },
    },
  });
};
