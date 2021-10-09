import { City } from '@modules/cities/domain/City';
import { MemoryCityRepository } from '@modules/cities/repositories';
import { genre_type } from '@modules/customers/domain/Customer';
import { ICreateCustomerDTO } from '@modules/customers/dtos/ICreateCustomerDTO';
import { CustomerNotFound } from '@modules/customers/errors/CustomerNotFound';
import { MemoryCustomerRepository } from '@modules/customers/repositories';
import { v4 as uuidv4 } from 'uuid';

import { FindCustomerUseCase } from '.';

describe('Customer', () => {
  describe('FindCustomer', () => {
    let findCustomers: FindCustomerUseCase;
    let customerRepository: MemoryCustomerRepository;
    let cityRepository: MemoryCityRepository;

    let city: City;

    beforeEach(async () => {
      customerRepository = new MemoryCustomerRepository();
      cityRepository = new MemoryCityRepository();
      findCustomers = new FindCustomerUseCase(customerRepository);

      city = await cityRepository.create({
        name: 'Pereiro',
        state: 'Ceará',
      });
    });

    it('Should be able to find a customer registered', async () => {
      const customer: ICreateCustomerDTO = {
        name: 'Milla Nunes',
        genre: genre_type.FEMALE,
        birth_date: new Date('28/06/2000'),
        city_id: city.id,
      };

      const customer2: ICreateCustomerDTO = {
        name: 'Maxmiller Nunes',
        genre: genre_type.MALE,
        birth_date: new Date('28/06/2000'),
        city_id: city.id,
      };

      const customer3: ICreateCustomerDTO = {
        name: 'Erick Pablo Nunes',
        genre: genre_type.MALE,
        birth_date: new Date('28/06/2000'),
        city_id: city.id,
      };

      const customerCreated = await customerRepository.create(customer);
      await customerRepository.create(customer2);
      await customerRepository.create(customer3);

      const customerExist = await findCustomers.execute(customerCreated.id);

      expect(customerExist).toHaveProperty('id');
      expect(customerExist).toHaveProperty('genre', customer.genre);
      expect(customerExist).toHaveProperty('name', customer.name);
      expect(customerExist).toHaveProperty('birth_date', customer.birth_date);
    });

    it('Should not be able to find a customer registered by non-existent id', async () => {
      const customer: ICreateCustomerDTO = {
        name: 'Milla Nunes',
        genre: genre_type.FEMALE,
        birth_date: new Date('28/06/2000'),
        city_id: city.id,
      };

      await customerRepository.create(customer);

      await expect(findCustomers.execute(uuidv4())).rejects.toEqual(
        new CustomerNotFound(),
      );
    });
  });
});
