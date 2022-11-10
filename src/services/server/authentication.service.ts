import { compare } from 'bcrypt';
import { ResourceNotFound } from '../../errors/ResourceNotFound';
import { WrongPasswordError } from '../../errors/WrongPasswordError';
import { getUserByUsername } from '../../db/mappers/user.mapper';
import { getPersonByUserId } from '../../db/mappers/person.mapper';
import { PrismaClient } from '@prisma/client';

export const authenticate = async (username: string, password: string) => {
  const prisma = new PrismaClient();
  const user = await getUserByUsername(prisma, username);

  if (!user) {
    throw new ResourceNotFound('User object not found');
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new WrongPasswordError();
  }

  const person = await getPersonByUserId(prisma, user.id);
  if (!person) {
    throw new ResourceNotFound('Person object not found');
  }

  return {
    userId: user.id,
    personId: person.id,
    firstname: person.firstname,
    lastname: person.lastname,
  };
};
