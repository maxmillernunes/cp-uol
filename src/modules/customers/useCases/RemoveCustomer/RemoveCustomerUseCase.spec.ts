import { City } from '@modules/cities/domain/City';
import { MemoryCityRepository } from '@modules/cities/repositories';
import { genre_type } from '@modules/customers/domain/Customer';
import { ICreateCustomerDTO } from '@modules/customers/dtos/ICreateCustomerDTO';
import { CustomerNotFound } from '@modules/customers/errors/CustomerNotFound';
import { MemoryCustomerRepository } from '@modules/customers/repositories';
import { v4 as uuidv4 } from 'uuid';

import { RemoveCustomerUseCase } from '.';

describe('Customer', () => {
  describe('ListCustomer', () => {
    let deleteCustomers: RemoveCustomerUseCase;
    let customerRepository: MemoryCustomerRepository;
    let cityRepository: MemoryCityRepository;

    let city: City;

    beforeEach(async () => {
      customerRepository = new MemoryCustomerRepository();
      cityRepository = new MemoryCityRepository();
      deleteCustomers = new RemoveCustomerUseCase(customerRepository);

      city = await cityRepository.create({
        name: 'Pereiro',
        state: 'Ceará',
      });
    });

    it('Should be able to list a customer registered', async () => {
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

      await deleteCustomers.execute(customerCreated.id);

      const findCustomer = await customerRepository.find();

      expect(findCustomer.length).toBe(2);
      expect(
        await customerRepository.findById(customerCreated.id),
      ).toBeUndefined();
    });

    it('should not be able to delete non-existent id', async () => {
      await expect(deleteCustomers.execute(uuidv4())).rejects.toEqual(
        new CustomerNotFound(),
      );
    });
  });
});
