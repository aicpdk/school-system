import { PrismaClient } from '@prisma/client';
import { getRole } from '../../db/mappers/role.mapper';
import { ResourceNotFound } from '../../errors/ResourceNotFound';
import { createPerson } from './person.service';
import { createUser } from './user.service';

interface ICreateNewAccount {
  person: {
    firstname: string;
    lastname: string;
    phone: string;
  };
  schoolId: string;
  user: {
    username: string;
    password: string;
  };
  roleId: string;
}

export const createNewAccount = async ({ person, schoolId, user, roleId }: ICreateNewAccount) => {
  const prisma = new PrismaClient();
  try {
    prisma.$transaction(async (tx) => {
      const _prisma = tx as any;
      const _person = await createPerson(_prisma, person);
      const _role = await getRole(_prisma, roleId);

      if (!_role) {
        throw new ResourceNotFound('role was not found');
      }

      const _user = await createUser(_prisma, { ...user, personId: _person.id, roleId: roleId });
      console.log(_user);
    });
  } finally {
    await prisma.$disconnect();
  }
};
export const linkNewAccountToPerson = () => {};
