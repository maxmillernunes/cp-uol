import { prisma } from '@infra/database/prisma';
import { Customer } from '@modules/customers/domain/Customer';
import { CustomerMapper } from '@modules/customers/domain/CustomerMapper';
import { ICreateCustomerDTO } from '@modules/customers/dtos/ICreateCustomerDTO';
import { IUpdateUserDTO } from '@modules/customers/dtos/IUpdateUserDTO';
import { ICustomerRepository } from '@modules/customers/repositories';

class CustomersRepository implements ICustomerRepository {
  async create({
    name,
    genre,
    birth_date,
    city_id,
  }: ICreateCustomerDTO): Promise<Customer> {
    const persiste = CustomerMapper.toPersistence({
      name,
      genre,
      birth_date,
      city_id,
    });

    const customer = await prisma.customer.create({ data: persiste });

    return customer ? CustomerMapper.toRender(customer) : null;
  }

  async find(name?: string): Promise<Customer[]> {
    const customers = await prisma.customer.findMany({
      include: {
        city: true,
      },
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    return customers.map(CustomerMapper.toRender);
  }

  async findByName(name: string): Promise<Customer[]> {
    const customers = await prisma.customer.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    return customers.map(CustomerMapper.toRender);
  }

  async findById(customer_id: string): Promise<Customer> {
    const customer = await prisma.customer.findUnique({
      include: {
        city: true,
      },
      where: {
        id: customer_id,
      },
    });

    return customer ? CustomerMapper.toRender(customer) : null;
  }

  async save({ customer_id, name }: IUpdateUserDTO): Promise<void> {
    await prisma.customer.update({
      where: {
        id: customer_id,
      },
      data: { name },
    });
  }

  async delete(customer_id: string): Promise<void> {
    await prisma.customer.delete({ where: { id: customer_id } });
  }
}

export { CustomersRepository };
