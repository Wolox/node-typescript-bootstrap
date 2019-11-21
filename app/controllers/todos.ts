import { Response, NextFunction, Request } from 'express';
import { getAllTodos, Todo } from '../services/todos';

export const getTodos = (_: Request, res: Response, next: NextFunction): Promise<Response> =>
  getAllTodos()
    .then((todos: Todo[]) => res.send(todos))
    .catch(next);
