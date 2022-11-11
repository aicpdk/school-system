import { NextApiRequest, NextApiResponse } from 'next';
import { use } from 'next-api-middleware';
import { HttpErrorMiddleware } from '../../../middlewares/HttpErrorMiddleware';
import { HttpMethodMiddleware } from '../../../middlewares/HttpMethodMiddleware';
import { withApiSessionMiddleware } from '../../../middlewares/ApiSessionMiddleware';

import { PrismaClient } from '@prisma/client';

// const cookieExpirationDate = 1000 * 60 * 60 * 24 * 2;

export const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const joinedSchools = req.session.schools;

  const prisma = new PrismaClient();
  try {
    const schools = await prisma.school.findMany({
      where: {
        id: {
          in: joinedSchools.map((school) => school.id),
        },
      },
    });

    return res.status(200).json(schools);
  } finally {
    prisma.$disconnect();
  }
};

export default withApiSessionMiddleware(use(HttpErrorMiddleware, HttpMethodMiddleware(['GET']))(handler));
