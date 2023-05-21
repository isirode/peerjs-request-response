import { Request } from '../model/Request';
import { Response } from '../model/Response';

export interface IClient {
  fetch<RequestBodyType = undefined, ResponseBodyType = undefined>(request: Request<RequestBodyType>): Promise<Response<ResponseBodyType>>;
  cancel(request: Request): void;
  stop(): void;
}
