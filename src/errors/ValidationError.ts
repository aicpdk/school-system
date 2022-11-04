import { CustomError } from './CustomError';

export class HttpValidationError extends CustomError {
  public type = HttpValidationError.name;
  constructor(message: string) {
    super(message);
  }
}
