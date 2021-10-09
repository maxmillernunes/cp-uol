import { Router } from 'express';

import {
  createCustomerController,
  findCustomerController,
  listCustomersController,
} from '../factories/controllers/MakeCustomersController';

const customersRoutes = Router();

customersRoutes.post('/', createCustomerController.handle);
customersRoutes.get('/', listCustomersController.handle);
customersRoutes.get('/:customer_id', findCustomerController.handle);

export { customersRoutes };
