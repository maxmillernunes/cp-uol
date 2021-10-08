import { MemoryCityRepository } from '@modules/city/repositories';

import { ListCitiesUseCase } from '.';

describe('City', () => {
  let listCities: ListCitiesUseCase;
  let citiesRepository: MemoryCityRepository;

  describe('ListCities', () => {
    beforeEach(() => {
      citiesRepository = new MemoryCityRepository();
      listCities = new ListCitiesUseCase(citiesRepository);
    });

    it('Should be able a list all cities registered', async () => {
      const city = {
        name: 'Pereiro',
        state: 'Ceará',
      };

      const city2 = {
        name: 'Icó',
        state: 'Ceará',
      };

      await citiesRepository.create(city);
      await citiesRepository.create(city2);

      const cities = await listCities.execute({});

      expect(cities.length).toBe(2);
      expect(cities[0]).toHaveProperty('id');
    });

    it('Should be able to list city by name', async () => {
      const city = {
        name: 'Pereiro',
        state: 'Ceará',
      };
      const city2 = {
        name: 'Icó',
        state: 'Ceará',
      };

      await citiesRepository.create(city);
      await citiesRepository.create(city2);

      const cities = await listCities.execute({ name: 'Pereiro' });

      expect(cities.length).toBe(1);
      expect(cities[0]).toHaveProperty('id');
      expect(cities[0]).toHaveProperty('name', 'Pereiro');
      expect(cities[0]).toHaveProperty('state', 'Ceará');
    });

    it('Should be able to list city by state', async () => {
      const city = {
        name: 'Icó',
        state: 'Ceará',
      };

      const city2 = {
        name: 'Icó',
        state: 'Ceará',
      };

      const city3 = {
        name: 'Icó',
        state: 'Rio Grande do Norte',
      };

      await citiesRepository.create(city);
      await citiesRepository.create(city2);
      await citiesRepository.create(city3);

      const cities = await listCities.execute({ state: 'Ceará' });

      const [first, second] = cities;

      expect(cities.length).toBe(2);
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('name');
      expect(first).toHaveProperty('state', 'Ceará');
      expect(second).toHaveProperty('state', 'Ceará');
    });

    it('Should be able to list city by name and state', async () => {
      const city = {
        name: 'Pereiro',
        state: 'Ceará',
      };

      const city2 = {
        name: 'Pereiro',
        state: 'Rio Grande Norte',
      };

      const city3 = {
        name: 'São Miguel',
        state: 'Rio Grande Norte',
      };

      await citiesRepository.create(city);
      await citiesRepository.create(city2);
      await citiesRepository.create(city3);

      const cities = await listCities.execute({
        name: 'Pereiro',
        state: 'Ceará',
      });

      expect(cities.length).toBe(1);
      expect(cities[0]).toHaveProperty('id');
      expect(cities[0]).toHaveProperty('name', 'Pereiro');
      expect(cities[0]).toHaveProperty('state', 'Ceará');
    });
  });
});
