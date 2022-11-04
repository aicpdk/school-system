import { Middleware } from 'next-api-middleware';
import { InvalidTokenError } from '../errors/InvalidTokenError';
import { adminAuth } from '../config/firebase/admin';

export const AuthenticationMiddleware: Middleware = async (req, res, next) => {
  const idToken = req.headers.authorization?.replace('Bearer', '');

  if (!idToken) throw new InvalidTokenError('invalid authentication token');

  await adminAuth.verifyIdToken(idToken);

  await next();
};
