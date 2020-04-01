import { Router } from 'express';

import * as healthController from '../controllers/healthCheck';

const route = Router();

export default function generateHealthRoutes(app: Router): Router {
  app.use('/health', route);

  route.get('/', healthController.healthCheck);

  return app;
}
