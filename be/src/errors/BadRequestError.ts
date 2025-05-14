import { StatusCodes } from 'http-status-codes';
import { CustomError } from './CutomError';

export default class BadRequestError extends CustomError {
  private readonly _code: number;
  private readonly _logging: boolean;
  private readonly _context: { [key: string]: any };

  constructor(params?: { message?: string; logging?: boolean; context?: { [key: string]: any } }) {
    const { message, logging } = params || {};

    super(message || 'Bad request');
    this._code = StatusCodes.BAD_REQUEST;
    this._logging = logging || false;
    this._context = params?.context || {};

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
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
