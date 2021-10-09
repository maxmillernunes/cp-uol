import { AppException, ERRORS } from '@shared/errors';
import { HttpStatusCodes } from '@shared/errors/HttpStatusCode';

class CustomerNotFound extends AppException {
  constructor() {
    super(
      'Customer not found',
      ERRORS.CUSTOMER_NOT_FOUND,
      HttpStatusCodes.NOT_FOUND,
    );
  }
}

export { CustomerNotFound };
