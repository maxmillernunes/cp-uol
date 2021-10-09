import { celebrate } from 'celebrate';
import { Router } from 'express';

import {
  createCityController,
  listCitiesController,
} from '../factories/controllers/MakeCitiesController';
import { cityValidator } from '../validators';

const citiesRoutes = Router();

citiesRoutes.post(
  '/',
  celebrate(cityValidator.BODY),
  createCityController.handle,
);
citiesRoutes.get(
  '/',
  celebrate(cityValidator.QUERY),
  listCitiesController.handle,
);

export { citiesRoutes };
