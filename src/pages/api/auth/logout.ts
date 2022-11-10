import { NextApiRequest, NextApiResponse } from 'next';

import { use } from 'next-api-middleware';
import { HttpErrorMiddleware } from '../../../middlewares/HttpErrorMiddleware';
import { HttpMethodMiddleware } from '../../../middlewares/HttpMethodMiddleware';
import { withApiSessionMiddleware } from '../../../middlewares/ApiSessionMiddleware';

// const cookieExpirationDate = 1000 * 60 * 60 * 24 * 2;

export const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  req.session.destroy();

  res.redirect(301, '/login');
};

export default withApiSessionMiddleware(use(HttpErrorMiddleware, HttpMethodMiddleware(['GET']))(handler));
