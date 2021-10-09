import { Router } from 'express';

import {
  createCityController,
  listCitiesController,
} from '../factories/controllers/MakeCitiesController';

const citiesRoutes = Router();

citiesRoutes.post('/', createCityController.handle);
citiesRoutes.get('/', listCitiesController.handle);

export { citiesRoutes };
