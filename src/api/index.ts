import { Router } from 'express';

import healthRoutes from './routes/health';
import usersRoutes from './routes/users';
import todosRoutes from './routes/todos';

export default function generateAppRoutes(): Router {
  const app = Router();

  healthRoutes(app);
  usersRoutes(app);
  todosRoutes(app);

  return app;
}
