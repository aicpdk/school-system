import { CustomError } from './CustomError';

export class InvalidTokenError extends CustomError {
  public type = InvalidTokenError.name;
  constructor(message: string) {
    super(message);
  }
}
