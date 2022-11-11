import { NextApiRequest, NextApiResponse } from 'next';
import { use } from 'next-api-middleware';
import { HttpErrorMiddleware } from '../../../middlewares/HttpErrorMiddleware';
import { HttpMethodMiddleware } from '../../../middlewares/HttpMethodMiddleware';
import { withApiSessionMiddleware } from '../../../middlewares/ApiSessionMiddleware';
import { HttpValidationMiddleware } from '../../../middlewares/HttpValidationMiddleware';
import { LoginBody } from '../../../dto/LoginBody.dto';
import { authenticate } from '../../../services/server/authentication.service';
import { PrismaClient } from '@prisma/client';

// const cookieExpirationDate = 1000 * 60 * 60 * 24 * 2;

export const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { username, password } = req.body as LoginBody;

  const authentication = await authenticate(username, password);
  console.log({ authentication });
  const prisma = new PrismaClient();
  try {
    const schools = await prisma.personToSchool.findMany({
      where: {
        personId: authentication.personId,
      },
      select: {
        School: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    console.log({ schools: schools });

    req.session.user = {
      userId: authentication.userId,
      firstname: authentication.firstname,
      lastname: authentication.lastname,
    };
    req.session.person = {
      personId: authentication.personId,
    };
    req.session.schools = schools.map((school) => ({ id: school.School.id, name: school.School.name }));

    console.log(req.session);
    await req.session.save();

    res.redirect(301, '/');
  } finally {
    await prisma.$disconnect();
  }
};

export default withApiSessionMiddleware(use(HttpErrorMiddleware, HttpMethodMiddleware(['POST']), HttpValidationMiddleware(LoginBody))(handler));
