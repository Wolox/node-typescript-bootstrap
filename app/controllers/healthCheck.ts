import { Request, Response } from 'express';
import { statusCodes } from './commons';

export function healthCheck(_: Request, res: Response): Response {
  return res.status(statusCodes.success).send({ uptime: process.uptime() });
}
