import { Middleware } from 'next-api-middleware';
import { validateOrReject } from 'class-validator';

export const HttpValidationMiddleware =
  (ValidationClass: any): Middleware =>
  async (req, res, next) => {
    const validationClass = new ValidationClass();

    const body = req.body || {};

    Object.entries(body).map(([key, value]) => {
      validationClass[key] = value;
    });

    await validateOrReject(validationClass, {
      validationError: { target: false, value: false, children: false },
    });

    await next();
  };
