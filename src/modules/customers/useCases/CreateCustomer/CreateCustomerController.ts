import { IBaseController } from '@core/infra/IBaseController';
import { Customer } from '@modules/customers/domain/Customer';
import { ICreateCustomerDTO } from '@modules/customers/dtos/ICreateCustomerDTO';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCustomerUseCase } from './CreateCustomerUseCase';

class CreateCustomerController implements IBaseController {
  async handle(
    request: Request,
    response: Response,
  ): Promise<Response<Customer>> {
    const { name, genre, birth_date, city_id } =
      request.body as ICreateCustomerDTO;

    const createCustomer = container.resolve(CreateCustomerUseCase);

    const customer = await createCustomer.execute({
      name,
      genre,
      birth_date,
      city_id,
    });

    return response.status(201).json(customer);
  }
}

export { CreateCustomerController };
