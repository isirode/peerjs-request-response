import { Request } from '../../model/Request';
import { Response } from '../../model/Response';

export interface IServerMapper<MessageType = unknown, RequestBodyType = unknown, ResponseBodyType = unknown> {
  unwrap(data: MessageType): Request<RequestBodyType> | undefined;
  wrap(response: Response<ResponseBodyType>): MessageType;
}