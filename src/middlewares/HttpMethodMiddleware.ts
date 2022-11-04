import { Middleware } from 'next-api-middleware';
import { InvalidHttpMethodError } from '../errors/http/InvalidHttpMethodError';

export const HttpMethodMiddleware =
  (methods: string[]): Middleware =>
  async (req, res, next) => {
    if (!methods.includes(req.method!)) {
      throw new InvalidHttpMethodError('This method is not allowed.');
    }
    await next();
  };
