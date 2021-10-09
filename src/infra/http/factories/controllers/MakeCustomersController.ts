import { CreateCustomerController } from '@modules/customers/useCases/CreateCustomer';
import { FindCustomerController } from '@modules/customers/useCases/FindCustomer';
import { ListCustomersController } from '@modules/customers/useCases/ListCustomers';

const createCustomerController = new CreateCustomerController();
const listCustomersController = new ListCustomersController();
const findCustomerController = new FindCustomerController();

export {
  createCustomerController,
  listCustomersController,
  findCustomerController,
};
