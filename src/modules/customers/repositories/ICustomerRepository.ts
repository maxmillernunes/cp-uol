import { Customer } from '../domain/Customer';
import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';

interface ICustomerRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
  find(name?: string): Promise<Customer[]>;
  findByName(name: string): Promise<Customer[]>;
  findById(customer_id: string): Promise<Customer>;
}

export { ICustomerRepository };
