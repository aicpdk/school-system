import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';
import { sessionConfig } from '../config/session';

export const withPageRedirectMiddleware = (handler: GetServerSideProps) =>
  withIronSessionSsr((context) => {
    const { user } = context.req.session;

    console.log(user);

    if (user?.email) {
      return {
        redirect: {
          destination: '/',
          permanent: true,
        },
      };
    }

    return handler(context);
  }, sessionConfig);
