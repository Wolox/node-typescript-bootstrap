import { Response, NextFunction, Request } from 'express';
import { getAllTodos, Todo } from '../services/todos';

export function getTodos(_: Request, res: Response, next: NextFunction): Promise<Response> {
  return getAllTodos()
    .then((todos: Todo[]) => res.send(todos))
    .catch(next);
}
