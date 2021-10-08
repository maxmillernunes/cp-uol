import { City } from '@modules/cities/domain/City';
import { CreateCityDTO } from '@modules/cities/dtos/CreateCityDTO';
import { ListCitiesDTOS } from '@modules/cities/dtos/ListCitiesDTOS';

import { ICityRepository } from '../ICityRepository';

class MemoryCityRepository implements ICityRepository {
  private cities: City[] = [];

  async create({ name, state }: CreateCityDTO): Promise<City> {
    const city = City.create({ name, state });

    this.cities.push(city);

    return city;
  }

  async find({ name, state }: ListCitiesDTOS): Promise<City[]> {
    if (name && state) {
      return this.cities.filter(
        city =>
          city.name.toLowerCase() === name?.toLowerCase() &&
          city.state.toLowerCase() === state?.toLowerCase(),
      );
    }

    if (name) {
      return this.findByName(name);
    }

    if (state) {
      return this.findByState(state);
    }

    return this.cities;
  }

  async findByName(name: string): Promise<City[]> {
    const city = this.cities.filter(
      city => city.name.toLowerCase() === name.toLowerCase(),
    );

    return city;
  }

  async findByState(state: string): Promise<City[]> {
    const cities = this.cities.filter(
      city => city.state.toLowerCase() === state.toLowerCase(),
    );

    return cities;
  }
}

export { MemoryCityRepository };
