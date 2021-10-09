import { container } from 'tsyringe';

import {
  CUSTOMER,
  ICustomerRepository,
  MemoryCustomerRepository,
} from '../repositories';

container.registerSingleton<ICustomerRepository>(
  CUSTOMER.CUSTOMER_REPOSITORY,
  MemoryCustomerRepository,
);
