import { AppException, ERRORS, HttpStatusCodes } from '@shared/errors';

class CityAlreadyExists extends AppException {
  constructor() {
    super(
      'City already exists',
      ERRORS.CITY_ALREADY_EXISTS,
      HttpStatusCodes.CONFLICT,
    );
  }
}

export { CityAlreadyExists };
