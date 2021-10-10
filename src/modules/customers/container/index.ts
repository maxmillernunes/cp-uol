import { CustomersRepository } from '@infra/database/repositories';
import { container } from 'tsyringe';

import { CUSTOMER, ICustomerRepository } from '../repositories';

container.registerSingleton<ICustomerRepository>(
  CUSTOMER.CUSTOMER_REPOSITORY,
  CustomersRepository,
);
