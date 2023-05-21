import { Request } from '../model/Request';
import { Response } from '../model/Response';

export interface IClient<RequestBodyType = undefined, ResponseBodyType = undefined> {
  fetch(request: Request<RequestBodyType>): Promise<Response<ResponseBodyType>>;
  cancel(request: Request): void;
  stop(): void;
}
