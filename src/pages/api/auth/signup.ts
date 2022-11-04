import { NextApiRequest, NextApiResponse } from 'next';
import { adminAuth } from '../../../config/firebase/admin';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase/app';
import { use } from 'next-api-middleware';
import { HttpErrorMiddleware } from '../../../middlewares/HttpErrorMiddleware';
import { HttpMethodMiddleware } from '../../../middlewares/HttpMethodMiddleware';
import { withApiSessionMiddleware } from '../../../middlewares/ApiSessionMiddleware';
import { HttpValidationMiddleware } from '../../../middlewares/HttpValidationMiddleware';
import { SignupBody } from '../../../dto/SignupBody.dto';

// const cookieExpirationDate = 1000 * 60 * 60 * 24 * 2;

export const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { email, password } = req.body as SignupBody;

  const user = await createUserWithEmailAndPassword(auth, email, password);

  // const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn: cookieExpirationDate });

  // res.setHeader('set-cookie', `authCookie=${cookie}; path=/; samesite=lax; httponly;`);

  res.status(200).end();
};

export default withApiSessionMiddleware(use(HttpErrorMiddleware, HttpMethodMiddleware(['POST']), HttpValidationMiddleware(SignupBody))(handler));
