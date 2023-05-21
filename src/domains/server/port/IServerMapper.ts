import { Request } from '../../model/Request';
import { Response } from '../../model/Response';

export interface IServerMapper {
  map(data: any): Request | undefined;
  wrap(request: Response): any;
}