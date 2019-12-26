import { NextFunction, Request, Response } from 'express';
import userService from '../services/users';
import { User } from '../models/user';
import { statusCodes } from './commons';
import { notFound } from '../errors';

export function getUsers(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return userService
    .findAll()
    .then((users: User[]) => res.send(users))
    .catch(next);
}

export function createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return userService
    .createAndSave({ username: req.body.username } as User)
    .then((user: User) => res.status(statusCodes.created).send({ user }))
    .catch(next);
}

export function getUserById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return userService
    .findUser({ id: parseInt(req.params.id) })
    .then((user: User) => {
      if (!user) {
        throw notFound('User not found');
      }
      return res.send(user);
    })
    .catch(next);
}
