import { inject, injectable } from 'tsyringe';

import { City } from '../domain/City';
import { CreateCityDTO } from '../dtos/CreateCityDTO';
import { CityAlreadyExists } from '../errors/CityAlreadyExists';
import { CITY, ICityRepository } from '../repositories';

@injectable()
class CreateCityUseCase {
  constructor(
    @inject(CITY.CITY_REPOSITORY)
    private readonly citiesRepository: ICityRepository,
  ) {}

  async execute({ name, state }: CreateCityDTO): Promise<City> {
    const cityAlreadyExists = await this.citiesRepository.findByName(name);

    if (cityAlreadyExists) {
      throw new CityAlreadyExists();
    }

    return this.citiesRepository.create({ name, state });
  }
}

export { CreateCityUseCase };
