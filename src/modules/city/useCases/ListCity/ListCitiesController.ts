import { IBaseController } from '@core/infra/IBaseController';
import { ListCitiesDTOS } from '@modules/city/dtos/ListCitiesDTOS';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCitiesUseCase } from './ListCitiesUseCase';

class ListCitiesController implements IBaseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, state } = request.query as ListCitiesDTOS;

    const listCities = container.resolve(ListCitiesUseCase);

    const cities = await listCities.execute({ name, state });

    return response.status(200).json(cities);
  }
}

export { ListCitiesController };
