import { DataConnection } from "peerjs";
import { IServerHandler } from "./port/IServerHandler";
import { IServerMapper } from "./port/IServerMapper";

export interface IServer<MessageType = unknown, RequestBodyType = unknown, ResponseBodyType = unknown> {
  handler: IServerHandler<RequestBodyType, ResponseBodyType>;
  mapper: IServerMapper<MessageType, RequestBodyType, ResponseBodyType>;
  listen(): void;
  stop(): void;
  // TODO : type data as MessageType if possible
  handle(data: any, connection?: DataConnection): Promise<void>;
}
