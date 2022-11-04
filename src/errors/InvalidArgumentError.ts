import { CustomError } from './CustomError';

export class InvalidArgumentError extends CustomError {
  public type = InvalidArgumentError.name;
  constructor(message: string) {
    super(message);
  }
}
