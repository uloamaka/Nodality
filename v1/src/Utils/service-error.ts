import { StatusCodes } from 'http-status-codes';

export class ServiceError extends Error {
  public code: number;
  public data: any;

  constructor(message: string, code: number, data: any = null) {
    super(message);
    this.message = message;
    this.code = code;
    this.data = data;
  }
}

export class BadRequestException extends ServiceError {
  constructor(message: string, data?: any) {
    super(message, StatusCodes.BAD_REQUEST, data);
  }
}

export class UnprocessableContent extends ServiceError {
  constructor(message: string, data?: any) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY, data);
  }
}

export class UnauthorizedException extends ServiceError {
  constructor(message: string, data?: any) {
    super(message, StatusCodes.UNAUTHORIZED, data);
  }
}

export class InternalServerErrorException extends ServiceError {
  constructor(message: string, data?: any) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, data);
  }
}

export class ExpectationFailedException extends ServiceError {
  constructor(message: string, data?: any) {
    super(message, StatusCodes.EXPECTATION_FAILED, data);
  }
}

export class ServiceUnavailableException extends ServiceError {
  constructor(message: string, data?: any) {
    super(message, StatusCodes.SERVICE_UNAVAILABLE, data);
  }
}

export class NotFoundException extends ServiceError {
  constructor(message: string, data?: any) {
    super(message, StatusCodes.NOT_FOUND, data);
  }
}

export class TooManyRequestsException extends ServiceError {
  constructor(message: string, data?: any) {
    super(message, StatusCodes.TOO_MANY_REQUESTS, data);
  }
}

export class ActionNotAllowed extends ServiceError {
  constructor(message: string, data?: any) {
    super(message, StatusCodes.FORBIDDEN, data);
  }
}