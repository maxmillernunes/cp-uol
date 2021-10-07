import { Router } from 'express';

import { createCityController } from '../factories/CitiesController';

const citiesRoutes = Router();

citiesRoutes.post('/', createCityController.handle);

export { citiesRoutes };
