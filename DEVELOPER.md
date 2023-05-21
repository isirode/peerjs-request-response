# Developer

## Participating

You can post an issue or you can open a PR, if there is a functionality that you think will be relevant to the project.

Your code will be posted using the same license as this project.

## Running tests

> npm test

Or

> yarn test

## Build

> npm run build

Or

> yarn build

## Features

- [x] Client
  - [x] Emit a request
  - [x] Await a response
  - [x] Specify a timeout
  - [x] Settings to throw on timeout or to return an empty response

- [x] Server
  - [x] Abtract implementation

## TODO

- Ensure that we can run it from a specific 'layer' / 'channel'
  - Currently, I do not use the server because it start from the root message

- We probably need to make something like this inside peerjs-room

- Pack system
  - pack-destination is not the output destination
  - package.json does not allow interpolation of strings
  - postpack does not pass the tarball name
  - publish does not seem to allow to publish to a local dir
