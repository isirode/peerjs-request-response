import { Request } from '../model/Request';

export class CancellationError extends Error {
  request: Request;

  constructor(message: string, request: Request) {
    super(message);
    this.request = request;
  }

}