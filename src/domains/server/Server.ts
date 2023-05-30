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
    if (this.connection === undefined) {
      throw new Error(`connection is undefined`);
    }
    this.connection.on('data', this.handle);
  }

  stop() {
    if (this.connection === undefined) {
      throw new Error(`connection is undefined`);
    }
    this.connection.off('data', this.handle);
  }

  public async handle(data: any, connection?: DataConnection): Promise<void> {
    const request = this.mapper.unwrap(data);
    if  (request === undefined) {
      return;
    }
    // FIXME : the connection should not accept a promise as it does not make sense
    // and binarypack does not support it
    const response = await this.handler.handle(request);
    const actualResponse = this.mapper.wrap(response);
    if (this.connection !== undefined && connection !== undefined) {
      console.warn(`both the server's connection and the function connection parameter are present, it might be an error`);
    }
    this.connection?.send(actualResponse);
    connection?.send(actualResponse);
  }

}

