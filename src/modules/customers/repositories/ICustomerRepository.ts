import { Customer } from '../domain/Customer';
import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';

interface ICustomerRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
  find(name?: string): Promise<Customer[]>;
  findByName(name: string): Promise<Customer[]>;
  findById(customer_id: string): Promise<Customer>;
  updateUser(data: IUpdateUserDTO): Promise<void>;
  delete(customer_id: string): Promise<void>;
}

export { ICustomerRepository };
