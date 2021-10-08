import { CityAlreadyExists } from '@modules/city/errors/CityAlreadyExists';
import { MemoryCityRepository } from '@modules/city/repositories';
import { validate } from 'uuid';

import { CreateCityUseCase } from '.';

describe('City', () => {
  describe('CreateCity', () => {
    let createCity: CreateCityUseCase;
    let citiesRepository: MemoryCityRepository;

    beforeEach(() => {
      citiesRepository = new MemoryCityRepository();
      createCity = new CreateCityUseCase(citiesRepository);
    });

    it('Should be able to create a new city', async () => {
      const city = {
        name: 'Pereiro',
        state: 'Ceará',
      };
      const cityCreated = await createCity.execute(city);

      expect(cityCreated).toHaveProperty('id');
      expect(cityCreated).toHaveProperty('name', 'Pereiro');
      expect(validate(cityCreated.id)).toBeTruthy();
      expect(cityCreated.name).toBe(city.name);
    });

    it('should not be able to create a duplicated city', async () => {
      await createCity.execute({
        name: 'Pereiro',
        state: 'Ceará',
      });

      await expect(
        createCity.execute({
          name: 'Pereiro',
          state: 'Ceará',
        }),
      ).rejects.toEqual(new CityAlreadyExists());
    });

    it('Should be able a create new cities with the same name for the different states', async () => {
      await createCity.execute({
        name: 'Pereiro',
        state: 'Ceará',
      });

      const city = await createCity.execute({
        name: 'Pereiro',
        state: 'Rio Grande do Norte',
      });

      const cities = await citiesRepository.findByName('Pereiro');

      expect(city).toHaveProperty('id');
      expect(city).toHaveProperty('name', 'Pereiro');
      expect(validate(city.id)).toBeTruthy();
      expect(cities.length).toBe(2);
      expect(cities).toBeTruthy();
    });
  });
});
