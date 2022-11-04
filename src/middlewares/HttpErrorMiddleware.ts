import { ValidationError } from 'class-validator';
import { Middleware } from 'next-api-middleware';
import { HttpError } from '../errors/http/HttpError';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { WrongPasswordError } from '../errors/WrongPasswordError';
import { transformErrorObject, transformValidationError } from '../services/transformers/httpErrorTransformer';

const unAuthorized = [UserNotFoundError.name, WrongPasswordError.name];

export const HttpErrorMiddleware: Middleware = async (req, res, next) => {
  try {
    await next();
  } catch (e) {
    const error = e as any;

    if (error instanceof Array<ValidationError>) {
      return res.status(400).json({ errors: transformValidationError(error) });
    }

    if (unAuthorized.includes(error.type)) {
      return res.status(401).json({ errors: [transformErrorObject(error.type, error.message, error.stack)] });
    }

    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ errors: [transformErrorObject(error.type, error.message, error.stack)] });
    }

    return res.status(500).json({ errors: [transformErrorObject(error.type || 'InternalServerError', error.message, error.stack)] });
  }
};
