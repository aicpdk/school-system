import { NextApiRequest, NextApiResponse } from 'next';
import { use } from 'next-api-middleware';
import { HttpErrorMiddleware } from '../../../middlewares/HttpErrorMiddleware';
import { HttpMethodMiddleware } from '../../../middlewares/HttpMethodMiddleware';
import { withApiSessionMiddleware } from '../../../middlewares/ApiSessionMiddleware';

import { PrismaClient } from '@prisma/client';
import { ResourceNotFound } from '../../../errors/ResourceNotFound';

// const cookieExpirationDate = 1000 * 60 * 60 * 24 * 2;

export const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { userId } = req.session.user;

  const prisma = new PrismaClient();
  try {
    const school = await prisma.school.findFirst({
      where: {
        People: {
          every: {
            Person: {
              Users: {
                every: {
                  id: userId,
                },
              },
            },
          },
        },
      },
    });

    if (!school) {
      throw new ResourceNotFound('school does not exist');
    }

    const response = await prisma.person.findMany({
      where: {
        Schools: {
          every: {
            schoolId: school.id,
          },
        },
      },
      include: {
        Users: {
          include: {
            Role: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });

    const people = response.map((person) => {
      const roles = person.Users.map((user) => user.Role.name);
      return {
        ...person,
        roles,
      };
    });

    return res.status(200).json(people);
  } finally {
    prisma.$disconnect();
  }
};

export default withApiSessionMiddleware(use(HttpErrorMiddleware, HttpMethodMiddleware(['GET']))(handler));
