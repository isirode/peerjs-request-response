import { Request } from '../../model/Request';
import { Response } from '../../model/Response';

export interface IClientMapper<RequestBodyType = undefined, ResponseBodyType = undefined> {
  // Info : this map a PeerJS data event into a response
  unwrap(data: any): Response<ResponseBodyType> | undefined;
  // Info : this wrap a request into the data format you want
  wrap(request: Request<RequestBodyType>): any;
}