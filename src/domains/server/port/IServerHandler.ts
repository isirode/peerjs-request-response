import { Request } from '../../model/Request';
import { Response } from '../../model/Response';

export interface IServerHandler {
  handle(request: Request): Promise<Response>;
}