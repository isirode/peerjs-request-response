import { Request } from '../../model/Request';
import { Response } from '../../model/Response';

export interface IServerHandler<RequestBodyType = unknown, ResponseBodyType = unknown> {
  handle(request: Request<RequestBodyType>): Promise<Response<ResponseBodyType>>;
}