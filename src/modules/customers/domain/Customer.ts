import { BaseEntity } from '@core/domain/BaseEntity';

import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';

enum genre_type {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

class Customer extends BaseEntity {
  name: string;

  genre: genre_type;

  birth_date: Date;

  city_id?: string;

  public static create = (data: ICreateCustomerDTO): Customer =>
    Object.assign(new Customer(), data);
}

export { Customer, genre_type };
