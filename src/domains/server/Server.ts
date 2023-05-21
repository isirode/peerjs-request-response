import { DataConnection } from "peerjs";
import { IServer } from "./IServer";
import { IServerMapper } from "./port/IServerMapper";
import { IServerHandler } from "./port/IServerHandler";

export class Server<MessageType = unknown, RequestBodyType = unknown, ResponseBodyType = unknown> implements IServer<MessageType, RequestBodyType, ResponseBodyType> {

  handler: IServerHandler<RequestBodyType, ResponseBodyType>;
  mapper: IServerMapper<MessageType, RequestBodyType, ResponseBodyType>;
  connection?: DataConnection;

  constructor(mapper: IServerMapper<MessageType, RequestBodyType, ResponseBodyType>, handler: IServerHandler<RequestBodyType, ResponseBodyType>, connection?: DataConnection) {
    this.mapper = mapper;
    this.handler = handler;
    this.connection = connection;
  }

  listen() {
    // FIXME : log a warning if the connection is not present ?
    this.connection?.on('data', this.handle);
  }

  stop() {
    this.connection?.off('data', this.handle);
  }

  protected async handle(data: any, connection?: DataConnection): Promise<void> {
    const request = this.mapper.unwrap(data);
    if  (request === undefined) {
      return;
    }
    const response = this.handler.handle(request);
    this.connection?.send(response);
    connection?.send(response);
  }

}

