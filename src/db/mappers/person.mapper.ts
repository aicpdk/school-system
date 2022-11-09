import { PrismaClient } from '@prisma/client';

export const getPersonByUserId = async (prisma: PrismaClient, userId: string) => {
  return prisma.person.findFirst({
    where: {
      Users: { every: { id: userId } },
    },
  });
};

interface IConnectPersonToSchool {
  personId: string;
  schoolId: string;
}
export const connectPersonToSchool = async (prisma: PrismaClient, data: IConnectPersonToSchool) => {
  return prisma.personToSchool.create({
    data: {
      Person: {
        connect: {
          id: data.personId,
        },
      },
      School: {
        connect: {
          id: data.schoolId,
        },
      },
    },
  });
};
