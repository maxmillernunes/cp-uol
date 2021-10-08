import { City } from '@modules/cities/domain/City';
import { ListCitiesDTOS } from '@modules/cities/dtos/ListCitiesDTOS';
import { CITY, ICityRepository } from '@modules/cities/repositories';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListCitiesUseCase {
  constructor(
    @inject(CITY.CITY_REPOSITORY)
    private citiesRepository: ICityRepository,
  ) {}

  async execute({ name, state }: ListCitiesDTOS): Promise<City[]> {
    return this.citiesRepository.find({ name, state });
  }
}

export { ListCitiesUseCase };
