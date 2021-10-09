import { AppException, ERRORS, HttpStatusCodes } from '@shared/errors';

class InvalidGenre extends AppException {
  constructor() {
    super(
      'Invalid genre! Only accepted <MALE and FEMALE>',
      ERRORS.INVALID_GENRE,
      HttpStatusCodes.BAD_REQUEST,
    );
  }
}

export { InvalidGenre };
