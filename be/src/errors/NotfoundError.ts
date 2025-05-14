import { StatusCodes } from 'http-status-codes';
import { CustomError } from './CutomError';

export default class NotfoundError extends CustomError {
  private readonly _code: number;
  private readonly _logging: boolean;
  private readonly _context: { [key: string]: any };

  constructor(params?: { message?: string; logging?: boolean; context?: { [key: string]: any } }) {
    const { message, logging } = params || {};

    super(message || 'Not found');
    this._code = StatusCodes.NOT_FOUND;
    this._logging = logging || false;
    this._context = params?.context || {};

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotfoundError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }
}
