import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

export function healthCheck(_: Request, res: Response): Response {
  return res.status(HttpStatus.OK).send({ uptime: process.uptime() });
}
