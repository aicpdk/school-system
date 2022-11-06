import { IUser } from '../interfaces/IUser';

declare module 'iron-session' {
  interface IronSessionData {
    user: IUser;
    auth: {
      accessToken: string;
      idToken: string;
    };
  }
}

if (!process.env.SESSION_SECRET_KEY) {
  throw new Error('Missing SESSION_SECRET_KEY in .env file');
}

export const sessionConfig = {
  cookieName: 'aicpdk',
  password: process.env.SESSION_SECRET_KEY!,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
