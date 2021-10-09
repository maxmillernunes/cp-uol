import { Customer } from '@modules/customers/domain/Customer';
import { ICreateCustomerDTO } from '@modules/customers/dtos/ICreateCustomerDTO';

import { ICustomerRepository } from '../ICustomerRepository';

class MemoryCustomerRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  async create({
    name,
    genre,
    birth_date,
    city_id,
  }: ICreateCustomerDTO): Promise<Customer> {
    const customer = Customer.create({ name, genre, birth_date, city_id });

    this.customers.push(customer);

    return customer;
  }

  async find(name?: string): Promise<Customer[]> {
    if (name) {
      return this.findByName(name);
    }
    return this.customers;
  }

  async findByName(name: string): Promise<Customer[]> {
    const customers = this.customers.filter(customer => customer.name === name);

    return customers;
  }

  async findById(customer_id: string): Promise<Customer> {
    const customers = this.customers.find(
      customer => customer.id === customer_id,
    );

    return customers;
  }
}

export { MemoryCustomerRepository };
