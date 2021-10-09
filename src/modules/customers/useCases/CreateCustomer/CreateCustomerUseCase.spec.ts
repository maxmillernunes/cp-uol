import { City } from '@modules/cities/domain/City';
import { CityNotFound } from '@modules/cities/errors/CityNotFound';
import { MemoryCityRepository } from '@modules/cities/repositories';
import { genre_type } from '@modules/customers/domain/Customer';
import { ICreateCustomerDTO } from '@modules/customers/dtos/ICreateCustomerDTO';
import { InvalidGenre } from '@modules/customers/errors/InvalidGenre';
import { MemoryCustomerRepository } from '@modules/customers/repositories';
import { v4 as uuidv4 } from 'uuid';

import { CreateCustomerUseCase } from '.';

describe('Customer', () => {
  describe('CreateCustomer', () => {
    let createCustomer: CreateCustomerUseCase;
    let customerRepository: MemoryCustomerRepository;
    let cityRepository: MemoryCityRepository;

    let city: City;

    beforeAll(async () => {
      customerRepository = new MemoryCustomerRepository();
      cityRepository = new MemoryCityRepository();
      createCustomer = new CreateCustomerUseCase(
        customerRepository,
        cityRepository,
      );

      city = await cityRepository.create({
        name: 'Pereiro',
        state: 'Ceará',
      });
    });

    it('Should be able a to create a new customer', async () => {
      const customer: ICreateCustomerDTO = {
        name: 'Maxmiller Nunes',
        genre: genre_type.MALE,
        birth_date: new Date('28/06/2000'),
        city_id: city.id,
      };

      const customerCreated = await createCustomer.execute(customer);

      expect(
        await customerRepository.findById(customerCreated.id),
      ).toBeTruthy();
      expect(customerCreated).toHaveProperty('id');
      expect(customerCreated).toHaveProperty('name', 'Maxmiller Nunes');
    });

    it('should not be to register new customers with wrong city_id ', async () => {
      const customer: ICreateCustomerDTO = {
        name: 'Maxmiller Nunes',
        genre: genre_type.MALE,
        birth_date: new Date('28/06/2000'),
        city_id: uuidv4(),
      };

      await expect(createCustomer.execute(customer)).rejects.toEqual(
        new CityNotFound(),
      );
    });

    it('should not be able a to create customer with a non-existent genre', async () => {
      const customer: ICreateCustomerDTO = {
        name: 'Maxmiller Nunes',
        genre: 'FEMALE_MALE' as genre_type,
        birth_date: new Date('28/06/2000'),
        city_id: city.id,
      };

      await expect(createCustomer.execute(customer)).rejects.toEqual(
        new InvalidGenre(),
      );
    });
  });
});
