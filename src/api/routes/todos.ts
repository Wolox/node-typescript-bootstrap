import { Router } from 'express';

import * as todosController from '../controllers/todos';

const route = Router();

export default function generateUserRoutes(app: Router): Router {
  app.use('/todos', route);

  route.get('/', todosController.getTodos);

  return app;
}
