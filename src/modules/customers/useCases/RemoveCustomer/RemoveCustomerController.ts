import { IBaseController } from '@core/infra/IBaseController';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveCustomerUseCase } from './RemoveCustomerUseCase';

class RemoveCustomerController implements IBaseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customer_id } = request.params;

    const removeCustomer = container.resolve(RemoveCustomerUseCase);

    await removeCustomer.execute(customer_id);

    return response.status(204).send();
  }
}

export { RemoveCustomerController };
