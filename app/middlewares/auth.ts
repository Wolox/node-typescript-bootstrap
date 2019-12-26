import { Response, NextFunction, Request } from 'express';

import SessionManager, { HEADER_NAME } from '../services/session';
import { User } from '../models/user';
import userService from '../services/users';
import { authError } from '../errors';

export async function secure(req: Request, res: Response, next: NextFunction): Promise<void> {
  const auth = req.headers[HEADER_NAME] as string;

  if (auth) {
    const payload = SessionManager.decode(auth);

    const user: User | undefined = await userService.findUser({ id: parseInt(payload.id) });

    if (user) {
      req.user = user;
      return next();
    }
  }
  return next(authError);
}
