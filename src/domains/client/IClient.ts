import { Request } from '../model/Request';
import { Response } from '../model/Response';

export interface IClient {
  fetch(request: Request): Promise<Response>;
  cancel(request: Request): void;
  stop(): void;
}
