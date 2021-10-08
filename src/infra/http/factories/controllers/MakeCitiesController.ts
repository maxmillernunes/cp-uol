import { CreateCityController } from '@modules/cities/useCases/CreateCity';
import { ListCitiesController } from '@modules/cities/useCases/ListCity';

const createCityController = new CreateCityController();
const listCitiesController = new ListCitiesController();

export { createCityController, listCitiesController };
