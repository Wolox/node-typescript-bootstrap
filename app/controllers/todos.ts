import { Response, NextFunction, Request } from 'express';
import { getAllTodos } from '../services/todos';

export const getTodos = (_: Request, res: Response, next: NextFunction): Promise<Response> =>
  getAllTodos()
    .then(todos => res.send(todos))
    .catch(next);
