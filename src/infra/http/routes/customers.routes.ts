import { celebrate } from 'celebrate';
import { Router } from 'express';

import {
  createCustomerController,
  findCustomerController,
  listCustomersController,
  removeCustomerController,
  updateCustomerController,
} from '../factories/controllers/MakeCustomersController';
import { customerValidators } from '../validators';

const customersRoutes = Router();

customersRoutes.post(
  '/',
  celebrate(customerValidators.BODY),
  createCustomerController.handle,
);
customersRoutes.get(
  '/',
  celebrate(customerValidators.QUERY),
  listCustomersController.handle,
);
customersRoutes.get(
  '/:customer_id',
  celebrate(customerValidators.PARAMS),
  findCustomerController.handle,
);
customersRoutes.delete(
  '/:customer_id',
  celebrate(customerValidators.PARAMS),
  removeCustomerController.handle,
);
customersRoutes.patch(
  '/:customer_id',
  celebrate(customerValidators.UPDATE),
  updateCustomerController.handle,
);

export { customersRoutes };
