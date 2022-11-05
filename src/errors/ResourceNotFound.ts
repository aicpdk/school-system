import { CustomError } from './CustomError';

export class ResourceNotFound extends CustomError {
  public type = ResourceNotFound.name;
  constructor(message: string = 'resource not found') {
    super(message);
  }
}
