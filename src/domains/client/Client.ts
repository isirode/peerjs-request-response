import { Request } from '../model/Request';
import { Response } from '../model/Response';
import { IClient } from "./IClient";
import { DataConnection } from "peerjs";
import pWaitFor from 'p-wait-for';
import { CancellationError } from "./CancellationError";
import { IClientMapper } from './port/IClientMapper';

// FIXME
// Should we send a cancelled notification to the remote side ?
// Should it be an instance per connection ?
// Should it be bidirectional ?
// It is used for a connection only
// TODO : make a static client ?
// Warn : we have to type the client
export class Client<RequestBodyType = undefined, ResponseBodyType = undefined> implements IClient<RequestBodyType, ResponseBodyType> {

  connection: DataConnection;
  // FIXME : should it be typed ?
  mapper: IClientMapper<RequestBodyType, ResponseBodyType>;
  intervalTime: number;
  throwOnCancellation?: boolean;
  clearOnStop?: boolean;

  cancelledRequest: Map<string, Request> = new Map();

  awaitingResponse: Map<string, Request> = new Map();
  responses: Map<string, Response> = new Map();

  constructor(connection: DataConnection, mapper: IClientMapper<RequestBodyType, ResponseBodyType>, intervalTime?: number, throwOnCancellation?: boolean, clearOnStop?: boolean) {
    this.connection = connection;
    this.mapper = mapper;
    this.intervalTime = intervalTime ? intervalTime : 100;
    this.throwOnCancellation = throwOnCancellation;
    this.clearOnStop = clearOnStop ? clearOnStop : true;

    // Info : we have to pass by another method, otherwise 'this' will be the connection
    const self = this;
    connection.on('data', (data) => {
      self.handle(data);
    });
  }

  async fetch(request: Request<RequestBodyType>): Promise<Response<ResponseBodyType>> {
    this.connection.send(this.mapper.wrap(request));
    let response: Response<ResponseBodyType> | undefined;
    let isCancelled = false;
    await pWaitFor(() => {
      isCancelled = this.cancelledRequest.has(request.id);
      if (isCancelled) {
        return true;
      }
      response = this.responses.get(request.id) as Response<ResponseBodyType>;
      return response !== undefined;
    }, {
      timeout: request.timeout,
      interval: this.intervalTime,
    });
    if (isCancelled) {
      if (this.throwOnCancellation) {
        throw new CancellationError("the request was cancelled", request);
      } else {
        return {
          id: request.id,
          payload: undefined,
          wasCancelled: true
        }
      }
    }
    if (response === undefined) {
      throw new Error(`the request timed out before receiving a response`);
    }
    // FIXME : is there a way to handle the casting better than this ?
    return response as Response<ResponseBodyType>;
  }

  protected handle(data: any) {
    const response = this.mapper.unwrap(data);
    if (response === undefined) {
      return;
    }
    this.responses.set(response.id, response);
    this.awaitingResponse.delete(response.id);
  }

  cancel(request: Request) {
    this.cancelledRequest.set(request.id, request);
  }

  stop() {
    this.connection.off('data', this.handle);
    if (this.clearOnStop) {
      this.awaitingResponse.clear();
      this.responses.clear();
      this.cancelledRequest.clear();
    }
  }

}