import { Response, NextFunction, Request } from 'express';

import SessionManager, { HEADER_NAME } from '../services/session';
import userService from '../services/users';
import { User } from '../models/user';
import { authenticationError } from '../errors';

export async function secure(req: Request, res: Response, next: NextFunction): Promise<void> {
  const auth = req.headers[HEADER_NAME] as string;

  if (auth) {
    const payload: User = SessionManager.decode(auth);
    const user: User | undefined = await userService.findUser({ id: payload.id });
    if (user) {
      req.user = user;
      return next();
    }
  }
  return next(authenticationError);
}
