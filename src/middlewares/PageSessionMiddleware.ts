import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';
import { sessionConfig } from '../config/session';
import { getUserById } from '../db/mappers/user.mapper';
import { getPrismaClient } from '../db/prisma';

export const withPageSessionMiddleware = (handler: GetServerSideProps) =>
  withIronSessionSsr(async (context) => {
    const { user } = context.req.session;

    const redirect = () => {
      context.req.session.destroy();
      return {
        redirect: {
          destination: '/login',
          permanent: true,
        },
      };
    };

    if (!user?.userId) return redirect();

    const res = await getUserById(user.userId);
    if (!res) return redirect();

    return handler(context);
  }, sessionConfig);
