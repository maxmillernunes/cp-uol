import 'reflect-metadata';
import 'express-async-errors';

import { errors } from 'celebrate';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import '@shared/containers';

import { interceptorError } from './interceptors';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use('/api', routes);
app.use(errors());
app.use(interceptorError);

export { app };
