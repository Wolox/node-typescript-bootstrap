import { Router } from 'express';

import * as usersController from '../controllers/users';

const route = Router();

export default function generateUserRoutes(app: Router): Router {
  app.use('/users', route);

  route.get('/', usersController.getUsers);
  route.get('/:id', usersController.getUserById);
  route.post('/', usersController.createUser);

  return app;
}
