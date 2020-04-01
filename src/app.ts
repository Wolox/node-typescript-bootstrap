import express from 'express';
import expressLoader from './loaders/express';
import loggerLoader from './loaders/logger';

const app = express();

expressLoader(app);
loggerLoader(app);

export default app;
