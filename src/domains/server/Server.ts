import { DataConnection } from "peerjs";
import { IServer } from "./IServer";
import { IServerMapper } from "./port/IServerMapper";
import { IServerHandler } from "./port/IServerHandler";

export class Server implements IServer {

  mapper: IServerMapper;
  handler: IServerHandler;
  connection?: DataConnection;

  constructor(mapper: IServerMapper, handler: IServerHandler, connection?: DataConnection) {
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
    const request = this.mapper.map(data);
    if  (request === undefined) {
      return;
    }
    const response = this.handler.handle(request);
    this.connection?.send(response);
    connection?.send(response);
  }

}

