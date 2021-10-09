import { BaseEntity } from '@core/domain/BaseEntity';

import { ICreateCityDTO } from '../dtos/ICreateCityDTO';

class City extends BaseEntity {
  name: string;

  state: string;

  public static create = (data: ICreateCityDTO): City =>
    Object.assign(new City(), data);
}

export { City };
