import { City } from '../domain/City';
import { ICreateCityDTO } from '../dtos/ICreateCityDTO';
import { IListCitiesDTOS } from '../dtos/IListCitiesDTOS';

interface ICityRepository {
  create(data: ICreateCityDTO): Promise<City>;
  findByName(name: string): Promise<City[]>;
  find(data: IListCitiesDTOS): Promise<City[]>;
  findByState(state: string): Promise<City[]>;
  findById(city_id: string): Promise<City>;
}

export { ICityRepository };
