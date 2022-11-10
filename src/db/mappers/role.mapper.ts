import { PrismaClient } from '@prisma/client';

export const getRole = (prisma: PrismaClient, roleId: string) => {
  return prisma.role.findUnique({
    where: {
      id: roleId,
    },
  });
};
