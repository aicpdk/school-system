import { CustomError } from '../CustomError';

export class HttpError extends CustomError {
  constructor(public readonly statusCode: number, message: string) {
    super(message);
  }
}
