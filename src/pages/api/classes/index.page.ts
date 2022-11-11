import { NextApiRequest, NextApiResponse } from 'next';
import { use } from 'next-api-middleware';
import { HttpErrorMiddleware } from '../../../middlewares/HttpErrorMiddleware';
import { HttpMethodMiddleware } from '../../../middlewares/HttpMethodMiddleware';
import { withApiSessionMiddleware } from '../../../middlewares/ApiSessionMiddleware';

import { PrismaClient } from '@prisma/client';

// const cookieExpirationDate = 1000 * 60 * 60 * 24 * 2;

export const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { personId } = req.session.person;

  const prisma = new PrismaClient();
  try {
    const classes = await prisma.class.findMany({
      where: {
        People: {
          every: {
            personId,
          },
        },
      },
    });

    return res.status(200).json(classes);
  } finally {
    prisma.$disconnect();
  }
};

export default withApiSessionMiddleware(use(HttpErrorMiddleware, HttpMethodMiddleware(['GET']))(handler));
