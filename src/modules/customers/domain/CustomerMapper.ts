import { Customer as PersistenceCustomers, Genre } from '@prisma/client';

import { Customer, genre_type } from './Customer';

type PersistenceProps = {
  id: string;
  name: string;
  genre: Genre;
  birth_date: Date;
  city_id: string;
};

interface IRenderProps extends Customer {
  age: number;
}

class CustomerMapper {
  static toDomain(data: PersistenceCustomers): Customer {
    return Customer.create({
      ...data,
      genre: genre_type[data.genre],
    });
  }

  static toRender(data: PersistenceCustomers): IRenderProps {
    return {
      ...CustomerMapper.toDomain(data),
      age: new Date().getFullYear() - data.birth_date.getFullYear(),
    };
  }

  static toPersistence(customer: Customer): PersistenceProps {
    return {
      id: customer.id,
      birth_date: customer.birth_date,
      city_id: customer.city_id,
      genre: Genre[customer.genre],
      name: customer.name,
    };
  }
}

export { CustomerMapper };
