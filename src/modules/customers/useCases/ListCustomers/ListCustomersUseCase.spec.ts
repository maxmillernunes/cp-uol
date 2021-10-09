import { City } from '@modules/cities/domain/City';
import { MemoryCityRepository } from '@modules/cities/repositories';
import { genre_type } from '@modules/customers/domain/Customer';
import { ICreateCustomerDTO } from '@modules/customers/dtos/ICreateCustomerDTO';
import { MemoryCustomerRepository } from '@modules/customers/repositories';

import { ListCustomersUseCase } from '.';

describe('Customer', () => {
  describe('ListCustomer', () => {
    let listCustomers: ListCustomersUseCase;
    let customerRepository: MemoryCustomerRepository;
    let cityRepository: MemoryCityRepository;

    let city: City;

    beforeEach(async () => {
      customerRepository = new MemoryCustomerRepository();
      cityRepository = new MemoryCityRepository();
      listCustomers = new ListCustomersUseCase(customerRepository);

      city = await cityRepository.create({
        name: 'Pereiro',
        state: 'Ceará',
      });
    });

    it('Should be able a list customer by name', async () => {
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

      await customerRepository.create(customer);
      await customerRepository.create(customer2);
      await customerRepository.create(customer3);

      const customers = await listCustomers.execute('Maxmiller Nunes');

      expect(customers).toBeTruthy();
      expect(customers.length).toBe(1);
      expect(customers[0].name).toBe('Maxmiller Nunes');
    });

    it('Should be able to list all customers registered', async () => {
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

      await customerRepository.create(customer);
      await customerRepository.create(customer2);
      await customerRepository.create(customer3);

      const customers = await listCustomers.execute();

      const [first] = customers;

      expect(customers.length).toBe(3);
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('genre');
      expect(first).toHaveProperty('name');
      expect(first).toHaveProperty('birth_date');
    });
  });
});
