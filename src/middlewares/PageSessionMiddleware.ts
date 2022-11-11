import { PrismaClient } from '@prisma/client';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';
import { sessionConfig } from '../config/session';
import { getUserById } from '../db/mappers/user.mapper';

export const withPageSessionMiddleware = (handler: GetServerSideProps) =>
  withIronSessionSsr(async (context) => {
    const { user } = context.req.session;
    const prisma = new PrismaClient();
    try {
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

      const res = await getUserById(prisma, user.userId);
      if (!res) return redirect();
    } finally {
      await prisma.$disconnect();
    }
    return handler(context);
  }, sessionConfig);
