import { Customer } from '@modules/customers/domain/Customer';
import { ICreateCustomerDTO } from '@modules/customers/dtos/ICreateCustomerDTO';
import { IUpdateUserDTO } from '@modules/customers/dtos/IUpdateUserDTO';

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

  async updateUser({ customer_id, name }: IUpdateUserDTO): Promise<void> {
    const userIndex = this.customers.findIndex(user => user.id === customer_id);

    this.customers[userIndex].name = name;
  }

  async delete(customer_id: string): Promise<void> {
    const customerIndex = this.customers.findIndex(
      customer => customer.id === customer_id,
    );

    this.customers.splice(customerIndex, 1);
  }
}

export { MemoryCustomerRepository };
