import { City } from '@modules/city/domain/City';
import { CreateCityDTO } from '@modules/city/dtos/CreateCityDTO';
import { CityAlreadyExists } from '@modules/city/errors/CityAlreadyExists';
import { CITY, ICityRepository } from '@modules/city/repositories';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCityUseCase {
  constructor(
    @inject(CITY.CITY_REPOSITORY)
    private readonly citiesRepository: ICityRepository,
  ) {}

  async execute({ name, state }: CreateCityDTO): Promise<City> {
    const cities = await this.citiesRepository.findByName(name);

    const cityAlreadyExists = cities.some(
      city => city.state.toLowerCase() === state.toLowerCase(),
    );

    if (cityAlreadyExists) {
      throw new CityAlreadyExists();
    }

    return this.citiesRepository.create({ name, state });
  }
}

export { CreateCityUseCase };
