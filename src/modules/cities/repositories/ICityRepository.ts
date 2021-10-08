import { City } from '../domain/City';
import { CreateCityDTO } from '../dtos/CreateCityDTO';
import { ListCitiesDTOS } from '../dtos/ListCitiesDTOS';

interface ICityRepository {
  create(data: CreateCityDTO): Promise<City>;
  findByName(name: string): Promise<City[]>;
  find(data: ListCitiesDTOS): Promise<City[]>;
  findByState(state: string): Promise<City[]>;
}

export { ICityRepository };
