export class CustomError extends Error {
  public type = CustomError.name;
  constructor(message: string) {
    super(message);
  }
}
