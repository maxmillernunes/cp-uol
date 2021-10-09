import { City } from '@modules/cities/domain/City';
import { ICreateCityDTO } from '@modules/cities/dtos/ICreateCityDTO';
import { CityAlreadyExists } from '@modules/cities/errors/CityAlreadyExists';
import { CITY, ICityRepository } from '@modules/cities/repositories';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCityUseCase {
  constructor(
    @inject(CITY.CITY_REPOSITORY)
    private readonly citiesRepository: ICityRepository,
  ) {}

  async execute({ name, state }: ICreateCityDTO): Promise<City> {
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
