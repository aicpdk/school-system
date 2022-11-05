import { compare } from 'bcrypt';
import { ResourceNotFound } from '../errors/ResourceNotFound';
import { WrongPasswordError } from '../errors/WrongPasswordError';
import { getUserByUsername } from '../db/mappers/user.mapper';
import { getPersonByUserId } from '../db/mappers/person.mapper';

export const authenticate = async (username: string, password: string) => {
  const user = await getUserByUsername(username);

  if (!user) {
    throw new ResourceNotFound();
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new WrongPasswordError();
  }

  const person = await getPersonByUserId(user.id);
  if (!person) {
    throw new ResourceNotFound();
  }

  return {
    userId: user.id,
    personId: person.id,
    firstname: person.firstname,
    lastname: person.lastname,
  };
};

interface IAuth {
  email: string;
  password: string;
}
