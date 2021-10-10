import { CitiesRepository } from '@infra/database/repositories';
import { container } from 'tsyringe';

import { CITY, ICityRepository } from '../repositories';

container.registerSingleton<ICityRepository>(
  CITY.CITY_REPOSITORY,
  CitiesRepository,
);
