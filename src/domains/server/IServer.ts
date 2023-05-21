import { IServerHandler } from "./port/IServerHandler";
import { IServerMapper } from "./port/IServerMapper";

export interface IServer {
  handler: IServerHandler;
  mapper: IServerMapper;
  listen(): void;
  stop(): void;
}
