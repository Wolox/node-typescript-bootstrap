import { Response, NextFunction, Request } from 'express';

import SessionManager, { HEADER_NAME } from '../services/session';
import Models from '../models';
import { authError } from '../errors';
import { UserModel, IUserModel } from '../../types/models';

const User: UserModel = Models.users;

export async function secure(req: Request, res: Response, next: NextFunction): Promise<void> {
  const auth = req.headers[HEADER_NAME] as string;

  if (auth) {
    const payload = SessionManager.decode(auth);

    const user: IUserModel = await User.findOne({ where: payload });

    if (user) {
      req.user = user;
      return next();
    }
  }
  return next(authError);
}
