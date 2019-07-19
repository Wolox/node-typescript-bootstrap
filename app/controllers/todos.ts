import { Response, NextFunction } from 'express';
import { getAllTodos } from '../services/todos';

export const getTodos = (_: any, res: Response, next: NextFunction) =>
  getAllTodos()
    .then((todos: any) => res.send(todos))
    .catch(next);
