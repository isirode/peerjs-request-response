# peerjs-request-response

Disclaimer : not affiliated with the original developers of PeerJS

This is a WebRTC request / response library made using PeerJS.

## Features

- [x] Client
  - [x] Emit a request
  - [x] Await a response
  - [x] Specify a timeout
  - [x] Settings to throw on timeout or to return an empty response

- [x] Server
  - [x] Abtract implementation

## Using the library

An example of how to use it below:

```typescript
import { Client, IClientMapper, Request, Response } from 'peerjs-request-response';
import { v4 as uuidv4 } from 'uuid';

// From a PeerJS DataConnection
const connection: DataConnection = PeerJS connection;

interface MessageResponse {
  response: Response;
}

interface MessageRequest {
  request: Request;
}

const mapper: IClientMapper = {
  map: function (data: any): Response {
    // Info : this is an example where your channel is using a Message as data format
    // If you are using request / response in your connection, then you need to be careful not to use something else
    // Or to be able to handle potential errors
    const message: Message = data as MessageResponse;
    return message.response;
  },
  wrap: function (request: Request) {
    const message: MessageRequest = {
      request: request
    };
    return message;
  }
}

const client = new Client(connection, mapper);

const request: Request = {
  id: uuidv4(),
  timeout: gameInitTimeout,
  content: undefined
}

let response: Response;
try {
  response = await client.fetch(request);
} catch (err) {
  console.warn('probably a timeout', err);
  continue;
}

if (response.wasCancelled) {
  continue;
}

const body = response.payload as MyBody;
```

## Importing the project locally

It is not published yet, so you will need to follow the steps below:
- Clone the project
- Build it `npm run build`
- Link it `npm link`
- Or use the single liner `npm run local`
- Then, you can import it in your project using `npm link peerjs-request-response`

### Dependencies

You should not need to do any custom imports.

## Know issues

This is a work in progress, you should expect some bugs.

- The server is not particularly useful at the moment, even though it is working
  - It is very abstract

## Partipating

Open the [DEVELOPER.md](./DEVELOPER.md) section.

## License

It is provided with the GNU LESSER GENERAL PUBLIC LICENSE.

This is a WebRTC request / response library made using PeerJS.
Copyright (C) 2023  Isirode

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

