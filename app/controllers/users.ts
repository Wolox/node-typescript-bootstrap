import { Request, Response, NextFunction } from 'express';
import * as errors from '../errors';
import models from '../models';

const User = models.users;

export const getUsers = (_: any, res: Response, next: NextFunction) =>
  User.findAll()
    .then((users: any) => res.send(users))
    .catch(next);

export const createUser = (req: Request, res: Response, next: NextFunction) =>
  User.create({ username: req.body.username })
    .then(() => res.status(201).end())
    .catch(next);

export const getUserById = (req: Request, res: Response, next: NextFunction) =>
  User.findOne({ where: { id: req.params.id } })
    .then((user: any) => {
      if (!user) {
        return next(errors.notFound('User not found'));
      }

      return res.send(user);
    })
    .catch(next);
