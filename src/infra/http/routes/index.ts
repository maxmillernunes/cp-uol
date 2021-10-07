import { Router } from 'express';

import { citiesRoutes } from './city.routes';

const routes = Router();

routes.use('/cities', citiesRoutes);

export { routes };
