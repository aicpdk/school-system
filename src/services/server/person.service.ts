import { PrismaClient } from '@prisma/client';
import { getRole } from './role.service';
import { getUserById, getUserWithPersmissions } from './user.service';

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

export const getPersonByUserId = async (prisma: PrismaClient, userId: string) => {
  return prisma.person.findFirst({
    where: {
      Users: { every: { id: userId } },
    },
  });
};

interface ICreatePerson {
  firstname: string;
  lastname: string;
  phone: string;
  age?: number;

  address?: string;
  city?: string;
  countryCode?: string;
  zip?: number;

  schoolId?: string;
}
export const createPerson = async (prisma: PrismaClient, data: ICreatePerson) => {
  return prisma.person.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      age: data.age,

      address: data.address,
      city: data.city,
      zip: data.zip,
      countryCode: data.countryCode,
    },
  });
};

export const getPeople = async (userId: string) => {
  const prisma = new PrismaClient();
  try {
    return prisma.person.findMany({});
  } finally {
    prisma.$disconnect();
  }
};
