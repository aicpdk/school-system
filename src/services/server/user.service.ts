import { PrismaClient } from '@prisma/client';

export const getUserByUsername = (prisma: PrismaClient, username: string) => {
  return prisma.user.findUnique({ where: { username } });
};

export const getUserById = (prisma: PrismaClient, id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

interface ICreateUser {
  personId: string;
  username: string;
  password: string;
  roleId: string;
}
export const createUser = (prisma: PrismaClient, user: ICreateUser) => {
  return prisma.user.create({
    data: {
      username: user.username,
      password: user.password,
      Role: {
        connect: {
          id: user.roleId,
        },
      },
      isVerified: false,
      Person: {
        connect: {
          id: user.personId,
        },
      },
    },
  });
};

export const getUserWithPersmissions = (prisma: PrismaClient, userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Role: {
        include: {
          Permissions: {
            include: {
              Permission: {
                select: {
                  resource: true,
                  type: true,
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });
};
