import { BaseEntity } from '@core/domain/BaseEntity';

import { CreateCityDTO } from '../dtos/CreateCityDTO';

class City extends BaseEntity {
  name: string;
  state: string;

  public static create = (data: CreateCityDTO): City =>
    Object.assign(new City(), data);
}

export { City };
