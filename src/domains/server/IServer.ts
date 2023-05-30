import { DataConnection } from "peerjs";
import { IServerHandler } from "./port/IServerHandler";
import { IServerMapper } from "./port/IServerMapper";

export interface IServer<MessageType = unknown, RequestBodyType = unknown, ResponseBodyType = unknown> {
  handler: IServerHandler<RequestBodyType, ResponseBodyType>;
  mapper: IServerMapper<MessageType, RequestBodyType, ResponseBodyType>;
  listen(): void;
  stop(): void;
  // TODO : type data as MessageType if possible
  // I am not sure it make sense
  // It is this way so that we can bind it to a connection
  handle(data: any, connection?: DataConnection): Promise<void>;
}
