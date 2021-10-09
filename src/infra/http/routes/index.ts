import { Router } from 'express';

import { citiesRoutes } from './cities.routes';
import { customersRoutes } from './customers.routes';

const routes = Router();

routes.use('/cities', citiesRoutes);
routes.use('/customers', customersRoutes);

export { routes };
