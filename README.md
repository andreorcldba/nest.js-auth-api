## Description

API for crud users and authentication using Nests.js Framework.
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```
## Need install docker and docker compose
[Docker] (https://docs.docker.com)
[Docker Compose] (https://docs.docker.com/compose)

## UP containers
```bash
$ docker-compose up
```

## Start containers and inicialize postgres database for project

```bash
$ docker-compose start
```

## Run migration for pupulate database

```bash
$ npm run build (requirements to use type ORM migrations)
$ ts-node --transpile-only ./node_modules/typeorm/cli.js migration:run

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Check current api documentation in "http://localhost:3000/api/"

## Default user
email: admin@admin.com
password: 123

## Stay in touch

- Author - [André Vargas]
- Linkedin - [https://www.linkedin.com/in/andre-machado-de-vargas]