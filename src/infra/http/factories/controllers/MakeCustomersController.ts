import { CreateCustomerController } from '@modules/customers/useCases/CreateCustomer';
import { FindCustomerController } from '@modules/customers/useCases/FindCustomer';
import { ListCustomersController } from '@modules/customers/useCases/ListCustomers';
import { RemoveCustomerController } from '@modules/customers/useCases/RemoveCustomer';
import { UpdateCustomerController } from '@modules/customers/useCases/UdateCustomer';

const createCustomerController = new CreateCustomerController();
const listCustomersController = new ListCustomersController();
const findCustomerController = new FindCustomerController();
const removeCustomerController = new RemoveCustomerController();
const updateCustomerController = new UpdateCustomerController();

export {
  createCustomerController,
  listCustomersController,
  findCustomerController,
  removeCustomerController,
  updateCustomerController,
};
