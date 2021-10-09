import { genre_type } from '../domain/Customer';

type ICreateCustomerDTO = {
  name: string;
  genre: genre_type;
  birth_date: Date;
  city_id?: string;
};

export { ICreateCustomerDTO };
