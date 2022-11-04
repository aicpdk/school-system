import { CustomError } from './CustomError';

export class WrongPasswordError extends CustomError {
  public type = WrongPasswordError.name;
  constructor(message: string = 'wrong password') {
    super(message);
  }
}
