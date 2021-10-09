import { CITY, ICityRepository } from '@modules/cities/repositories';
import { Customer } from '@modules/customers/domain/Customer';
import { ICreateCustomerDTO } from '@modules/customers/dtos/ICreateCustomerDTO';
import { CityNotFound } from '@modules/customers/errors/CityNotFound';
import { InvalidGenre } from '@modules/customers/errors/InvalidGenre';
import { CUSTOMER, ICustomerRepository } from '@modules/customers/repositories';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCustomerUseCase {
  constructor(
    @inject(CUSTOMER.CUSTOMER_REPOSITORY)
    private customerRepository: ICustomerRepository,

    @inject(CITY.CITY_REPOSITORY)
    private cityRepository: ICityRepository,
  ) {}

  async execute({
    name,
    genre,
    birth_date,
    city_id,
  }: ICreateCustomerDTO): Promise<Customer> {
    const city = await this.cityRepository.findById(city_id);

    if (!city) {
      throw new CityNotFound();
    }

    if (!['FEMALE', 'MALE'].includes(genre)) {
      throw new InvalidGenre();
    }

    const customer = await this.customerRepository.create({
      name,
      genre,
      birth_date,
      city_id,
    });

    return customer;
  }
}

export { CreateCustomerUseCase };
