import { Request, Response } from 'express';
import { statusCodes } from './commons';

export const healthCheck = (_: Request, res: Response): Response =>
  res.status(statusCodes.success).send({ uptime: process.uptime() });
