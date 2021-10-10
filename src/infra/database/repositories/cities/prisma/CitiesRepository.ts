import { prisma } from '@infra/database/prisma';
import { City } from '@modules/cities/domain/City';
import { ICreateCityDTO } from '@modules/cities/dtos/ICreateCityDTO';
import { IListCitiesDTOS } from '@modules/cities/dtos/IListCitiesDTOS';
import { ICityRepository } from '@modules/cities/repositories';

class CitiesRepository implements ICityRepository {
  async create({ name, state }: ICreateCityDTO): Promise<City> {
    return prisma.city.create({ data: { name, state } });
  }

  async find({ name, state }: IListCitiesDTOS): Promise<City[]> {
    const cities = await prisma.city.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        state: {
          contains: state,
          mode: 'insensitive',
        },
      },
    });

    return cities;
  }

  async findByName(name: string): Promise<City[]> {
    const cities = await prisma.city.findMany({
      where: {
        name,
      },
    });

    return cities;
  }

  async findByState(state: string): Promise<City[]> {
    const cities = await prisma.city.findMany({
      where: {
        state,
      },
    });

    return cities;
  }

  async findById(city_id: string): Promise<City> {
    const city = await prisma.city.findUnique({
      where: {
        id: city_id,
      },
    });

    return city;
  }
}

export { CitiesRepository };
