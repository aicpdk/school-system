import { ValidationError } from 'class-validator';
import { IHttpError } from '../../interfaces/IHttpError';

// TODO: only return stackTrace when in debug mode
export const transformErrorObject = (type = 'InternalServerError', message: string, stackTrace?: string): IHttpError => {
  return { type, message, stackTrace };
};

export const transformValidationError = (validationErrors: Array<ValidationError>) => {
  return validationErrors.reduce((result, err: ValidationError): IHttpError[] => {
    Object.entries(err.constraints!).map(([_, value]) => {
      result.push(transformErrorObject('ValidationError', value));
    });
    return result;
  }, [] as IHttpError[]);
};
