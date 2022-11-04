import { CustomError } from './CustomError';

export class UserNotFoundError extends CustomError {
  public type = UserNotFoundError.name;
  constructor(message: string = 'user not found') {
    super(message);
  }
}
