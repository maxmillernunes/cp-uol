import { Router } from 'express';

import {
  createCustomerController,
  findCustomerController,
  listCustomersController,
  removeCustomerController,
  updateCustomerController,
} from '../factories/controllers/MakeCustomersController';

const customersRoutes = Router();

customersRoutes.post('/', createCustomerController.handle);
customersRoutes.get('/', listCustomersController.handle);
customersRoutes.get('/:customer_id', findCustomerController.handle);
customersRoutes.delete('/:customer_id', removeCustomerController.handle);
customersRoutes.patch('/:customer_id', updateCustomerController.handle);

export { customersRoutes };
