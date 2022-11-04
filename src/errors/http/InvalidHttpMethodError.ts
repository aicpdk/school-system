import { CustomError } from '../CustomError';
import { HttpError } from './HttpError';

export class InvalidHttpMethodError extends HttpError {
  public type = InvalidHttpMethodError.name;
  constructor(message: string) {
    super(405, message);
  }
}
