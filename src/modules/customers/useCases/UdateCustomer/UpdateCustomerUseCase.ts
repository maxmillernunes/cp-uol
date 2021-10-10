import { IUpdateUserDTO } from '@modules/customers/dtos/IUpdateUserDTO';
import { CustomerNotFound } from '@modules/customers/errors/CustomerNotFound';
import { CUSTOMER, ICustomerRepository } from '@modules/customers/repositories';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateCustomerUseCase {
  constructor(
    @inject(CUSTOMER.CUSTOMER_REPOSITORY)
    private customerRepository: ICustomerRepository,
  ) {}

  async execute({ customer_id, name }: IUpdateUserDTO): Promise<void> {
    const userExists = await this.customerRepository.findById(customer_id);

    if (!userExists) {
      throw new CustomerNotFound();
    }

    return this.customerRepository.save({ customer_id, name });
  }
}

export { UpdateCustomerUseCase };
