import { NextFunction, Request, Response } from 'express';
import userService from '../services/users';
import { User } from '../models/user';
import { statusCodes } from './commons';
import { notFound } from '../errors';

export const getUsers = (_: Request, res: Response, next: NextFunction): Promise<void | Response> =>
  userService
    .findAll()
    .then((users: User[]) => res.send(users))
    .catch(next);

export const createUser = (req: Request, res: Response, next: NextFunction): Promise<void | Response> =>
  userService
    .createAndSave({ username: req.body.username } as User)
    .then((user: User) => res.status(statusCodes.created).send({ user }))
    .catch(next);

export const getUserById = (req: Request, res: Response, next: NextFunction): Promise<void | Response> =>
  userService
    .findUser({ id: parseInt(req.params.id) })
    .then((user: User) => {
      if (!user) {
        throw notFound('User not found');
      }
      return res.send(user);
    })
    .catch(next);
