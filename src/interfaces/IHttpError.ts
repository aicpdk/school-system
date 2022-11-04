export interface IHttpError {
  type: string;
  message: string;
  stackTrace?: string; // should only be visible in debug mode
}
