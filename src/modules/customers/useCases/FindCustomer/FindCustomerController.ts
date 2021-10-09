import { IBaseController } from '@core/infra/IBaseController';
import { Customer } from '@modules/customers/domain/Customer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindCustomerUseCase } from '.';

class FindCustomerController implements IBaseController {
  async handle(
    request: Request,
    response: Response,
  ): Promise<Response<Customer>> {
    const { customer_id } = request.params;

    const findCustomer = container.resolve(FindCustomerUseCase);

    const customer = await findCustomer.execute(customer_id);

    return response.status(200).json(customer);
  }
}

export { FindCustomerController };
