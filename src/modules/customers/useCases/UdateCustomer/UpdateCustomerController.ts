import { IBaseController } from '@core/infra/IBaseController';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCustomerUseCase } from './UpdateCustomerUseCase';

class UpdateCustomerController implements IBaseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customer_id } = request.params;
    const { name } = request.body;

    const updateCustomer = container.resolve(UpdateCustomerUseCase);

    await updateCustomer.execute({ customer_id, name });

    return response.status(204).send();
  }
}

export { UpdateCustomerController };
