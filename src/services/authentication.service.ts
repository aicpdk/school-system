import { getPrismaClient } from '../db/prisma';
import { compare } from 'bcrypt';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { WrongPasswordError } from '../errors/WrongPasswordError';

export const authenticate = async (email: string, password: string) => {
  const prisma = getPrismaClient();
  const user = await prisma.employee.findUnique({ where: { email: email } });

  if (!user) {
    throw new UserNotFoundError();
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new WrongPasswordError();
  }

  return {
    userId: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    companyId: user.companyId,
  };
};

interface IAuth {
  email: string;
  password: string;
}
