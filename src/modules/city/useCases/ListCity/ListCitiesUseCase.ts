import { City } from '@modules/city/domain/City';
import { ListCitiesDTOS } from '@modules/city/dtos/ListCitiesDTOS';
import { CITY, ICityRepository } from '@modules/city/repositories';
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
