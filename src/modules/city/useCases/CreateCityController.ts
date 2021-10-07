import { IBaseController } from '@core/infra/IBaseController';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { City } from '../domain/City';
import { CreateCityUseCase } from './CreateCityUseCase';

class CreateCityController implements IBaseController {
  async handle(request: Request, response: Response): Promise<Response<City>> {
    const { name, state } = request.body;
    const createCity = container.resolve(CreateCityUseCase);

    const city = await createCity.execute({ name, state });

    return response.status(201).json(city);
  }
}

export { CreateCityController };
