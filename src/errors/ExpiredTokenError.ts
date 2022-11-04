import { CustomError } from './CustomError';

export class ExpiredTokenError extends CustomError {
  public type = ExpiredTokenError.name;
  constructor(message: string) {
    super(message);
  }
}
