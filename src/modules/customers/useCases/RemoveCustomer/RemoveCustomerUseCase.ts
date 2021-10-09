import { CustomerNotFound } from '@modules/customers/errors/CustomerNotFound';
import { CUSTOMER, ICustomerRepository } from '@modules/customers/repositories';
import { inject, injectable } from 'tsyringe';

@injectable()
class RemoveCustomerUseCase {
  constructor(
    @inject(CUSTOMER.CUSTOMER_REPOSITORY)
    private customerRepository: ICustomerRepository,
  ) {}

  async execute(customer_id: string): Promise<void> {
    const userExists = await this.customerRepository.findById(customer_id);

    if (!userExists) {
      throw new CustomerNotFound();
    }

    return this.customerRepository.delete(customer_id);
  }
}

export { RemoveCustomerUseCase };
