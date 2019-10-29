import { NextFunction, Request, Response } from 'express';
import models from '../models';
import { statusCodes } from './commons';
import { notFound } from '../errors';
import { IUserModel } from '../../types/models';

const User = models.users;

export const getUsers = (_: Request, res: Response, next: NextFunction): Promise<Response> =>
  User.findAll()
    .then((users: IUserModel[]) => res.send(users))
    .catch(next);

export const createUser = (req: Request, res: Response, next: NextFunction): Promise<void> =>
  User.create({ username: req.body.username })
    .then(user => res.status(statusCodes.created).send({ user }))
    .catch(next);

export const getUserById = (req: Request, res: Response, next: NextFunction): Promise<Response> =>
  User.findOne({ where: { id: req.params.id } })
    .then((user: IUserModel) => {
      if (!user) {
        throw notFound('User not found');
      }
      return res.send(user);
    })
    .catch(next);
