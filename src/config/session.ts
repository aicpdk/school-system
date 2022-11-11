declare module 'iron-session' {
  interface IronSessionData {
    user: {
      userId: string;
      firstname: string;
      lastname: string | null;
    };
    person: {
      personId: string;
    };
    schools: {
      id: string;
      name: string;
    }[];
  }
}

export const sessionConfig = {
  cookieName: 'aicpdk',
  password: process.env.SESSION_SECRET_KEY!,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
