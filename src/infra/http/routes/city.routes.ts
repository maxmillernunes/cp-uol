import { Router } from 'express';

import { createCityController } from '../factories/controllers/MakeCitiesController';

const citiesRoutes = Router();

citiesRoutes.post('/', createCityController.handle);

export { citiesRoutes };
