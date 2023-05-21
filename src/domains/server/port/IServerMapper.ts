import { Request } from '../../model/Request';
import { Response } from '../../model/Response';

export interface IServerMapper<T = unknown, U = unknown> {
  map(data: T): Request | undefined;
  wrap(response: Response): T;
}