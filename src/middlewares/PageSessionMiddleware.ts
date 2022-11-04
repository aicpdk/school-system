import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';
import { sessionConfig } from '../config/session';
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

    if (!user?.email) return redirect();

    const res = await getPrismaClient().employee.findUnique({ where: { id: user.id } });
    if (!res) return redirect();

    return handler(context);
  }, sessionConfig);
