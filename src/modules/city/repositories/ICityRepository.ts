import { City } from '../domain/City';
import { CreateCityDTO } from '../dtos/CreateCityDTO';

interface ICityRepository {
  create(data: CreateCityDTO): Promise<City>;
  findByName(name: string): Promise<City>;
}

export { ICityRepository };
