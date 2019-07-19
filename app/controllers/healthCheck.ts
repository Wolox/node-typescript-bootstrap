import { Response } from 'express';

export const healthCheck = (_: any, res: Response) => res.status(200).send({ uptime: process.uptime() });
