import { City } from '@modules/cities/domain/City';
import { IListCitiesDTOS } from '@modules/cities/dtos/IListCitiesDTOS';
import { CITY, ICityRepository } from '@modules/cities/repositories';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListCitiesUseCase {
  constructor(
    @inject(CITY.CITY_REPOSITORY)
    private citiesRepository: ICityRepository,
  ) {}

  async execute({ name, state }: IListCitiesDTOS): Promise<City[]> {
    return this.citiesRepository.find({ name, state });
  }
}

export { ListCitiesUseCase };
