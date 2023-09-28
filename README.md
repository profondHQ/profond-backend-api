## Description

Profond Backend API that serve information about collection and coins for projects (wallet address).

## Dependencies

1. Node.JS
2. Yarn `npm install --global yarn`
3. MongoDB

## Environment

Put your `MONGODB_URL` on your host environment or inside `.env`

```
MONGODB_URL=
```
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```