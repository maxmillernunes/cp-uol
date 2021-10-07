import { CreateCityController } from '@modules/city/useCases/CreateCity';
import { ListCitiesController } from '@modules/city/useCases/ListCity';

const createCityController = new CreateCityController();
const listCitiesController = new ListCitiesController();

export { createCityController, listCitiesController };
