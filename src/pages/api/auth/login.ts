import { NextApiRequest, NextApiResponse } from 'next';
// import { appAuth } from '../../../config/firebase';
// import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { use } from 'next-api-middleware';
import { HttpErrorMiddleware } from '../../../middlewares/HttpErrorMiddleware';
import { HttpMethodMiddleware } from '../../../middlewares/HttpMethodMiddleware';
import { withApiSessionMiddleware } from '../../../middlewares/ApiSessionMiddleware';
import { HttpValidationMiddleware } from '../../../middlewares/HttpValidationMiddleware';
import { LoginBody } from '../../../dto/LoginBody.dto';
import { authenticate } from '../../../services/authentication.service';
import { withSentry } from '@sentry/nextjs';

// const cookieExpirationDate = 1000 * 60 * 60 * 24 * 2;

export const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { username, password } = req.body as LoginBody;

  const { lastname, personId, firstname, userId } = await authenticate(username, password);

  req.session.user = {
    personId,
    firstname,
    userId,
    lastname,
  };

  await req.session.save();

  res.redirect(301, '/');
};

export default withSentry(
  withApiSessionMiddleware(use(HttpErrorMiddleware, HttpMethodMiddleware(['POST']), HttpValidationMiddleware(LoginBody))(handler))
);
