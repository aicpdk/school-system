import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionConfig } from '../config/session';

export const withApiSessionMiddleware = (handler: any) => withIronSessionApiRoute(handler, sessionConfig);
