import { IBaseController } from '@core/infra/IBaseController';
import { Customer } from '@modules/customers/domain/Customer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCustomersUseCase } from '.';

class ListCustomersController implements IBaseController {
  async handle(
    request: Request,
    response: Response,
  ): Promise<Response<Customer[]>> {
    const { name } = request.query as { name: string };

    const listCustomers = container.resolve(ListCustomersUseCase);

    const customers = await listCustomers.execute(name);

    return response.status(200).json(customers);
  }
}

export { ListCustomersController };
