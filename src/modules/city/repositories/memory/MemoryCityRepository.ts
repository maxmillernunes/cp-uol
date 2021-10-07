import { City } from '@modules/city/domain/City';
import { CreateCityDTO } from '@modules/city/dtos/CreateCityDTO';

import { ICityRepository } from '../ICityRepository';

class MemoryCityRepository implements ICityRepository {
  private cities: City[] = [];

  async create({ name, state }: CreateCityDTO): Promise<City> {
    const city = City.create({ name, state });

    this.cities.push(city);

    return city;
  }

  async findByName(name: string): Promise<City> {
    const city = this.cities.find(city => city.name === name);

    return city;
  }
}

export { MemoryCityRepository };
