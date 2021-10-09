import { IBaseController } from '@core/infra/IBaseController';
import { IListCitiesDTOS } from '@modules/cities/dtos/IListCitiesDTOS';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCitiesUseCase } from './ListCitiesUseCase';

class ListCitiesController implements IBaseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, state } = request.query as IListCitiesDTOS;

    const listCities = container.resolve(ListCitiesUseCase);

    const cities = await listCities.execute({ name, state });

    return response.status(200).json(cities);
  }
}

export { ListCitiesController };
