import ErrorEnum from '../../enums/errors';
import ErrorInterface from './error';

class SystemError extends Error {
  public type: ErrorEnum;
  public errors: ErrorInterface[];

  constructor(type: ErrorEnum, errors: ErrorInterface[]) {
    super();
    this.type = type;
    this.errors = errors;
  }
}

export default SystemError;
