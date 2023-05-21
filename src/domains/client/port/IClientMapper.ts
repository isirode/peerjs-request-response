import { Request } from '../../model/Request';
import { Response } from '../../model/Response';

export interface IClientMapper {
  // Info : this map a PeerJS data event into a response
  map(data: any): Response | undefined;
  // Info : this wrap a request into the data format you want
  wrap(request: Request): any;
}