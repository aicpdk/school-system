export interface IUser {
  id: string;
  username: string;
  password: string;
  isVerified?: boolean; // TODO: remove from user object
}
