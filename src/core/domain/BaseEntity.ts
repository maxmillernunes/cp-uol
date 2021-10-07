import { v4 as uuid } from 'uuid';

abstract class BaseEntity {
  readonly id?: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { BaseEntity };
