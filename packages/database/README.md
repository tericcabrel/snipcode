# Snipcode Database

This package contains all the entities and data access layer that can be used in the Backend or Lambda functions.
We use Prisma as the ORM to create database migrations and entities.

## Tech Stack
* Node.js
* Typescript
* [Prisma](https://www.prisma.io/)

## Prerequisites
Make sure you have this tools installed before running the project
* Node.js 18+
* Yarn
* [PlanetScale CLI](https://planetscale.com/cli)

## Set up the project
Delete the existing folders output from build commands
```shell
yarn clean
```
Install node modules
````shell
yarn install
````

Create the .env file from the template
```shell
cp .env.template .env
# open .env file and update it with your local environment configuration
nano .env
```

### Connect to the local database locally
This project uses PlanetScale for database and to connect to the database locally, 
you must authenticate first (Ask the credentials to [@tericcabrel](https://github.com/tericcabrel)).
Once authenticated from the terminal, execute the commands below on two separate terminals.
```shell
# On a terminal
yarn db:dev
# On a second terminal (only necessary if you update the prisma schema)
yarn db:shadow
```

The shadow database run on Docker, so don't forget to stop it when you don't need it
```shell
yarn db:shadow:stop
```

### Run the database migration, generate Prisma types and seed the database with default data
```shell
yarn db:generate
yarn db:migrate:dev
yarn db:seed
```

### Generate a database migration
To generate a database migration, we run the command below:
```shell
yarn db:migrate:dev --name <migration-name>
```
Once done, make a copy of the file `prisma/schema.prisma` to `prisma/schema.test.prisma`.

Open the copied file and remove the line `shadowDatabaseUrl    = env("SHADOW_DATABASE_URL")`.

This action is required to make the test executions easier in the package **domain (packages/domain)**.

### Others Prisma commands
- Reset the database without seeding: `db:reset:dev`
- Reset the database with seeding: `db:reset:dev:seed`
- Open Prisma Studio to browse your DB: `db:view`
- Lint the Prisma schema file: `db:format`

### Create a deployment request
To publish the database schema changes in production, you must create a deployment request. Run the command below to do that
```shell
yarn db:deploy:create
```

Build the package to generate types declaration required to provide autocompletion while using the functions in the core or Lambda functions
```bash
yarn build
```
A `dist` folder will be generated.

## Running tests
Run the command below to run all the tests
```shell
yarn test
```
To run a specific test file, append the filename after the command
```shell
yarn test id.test.ts
```

## Lint the project
ESLint and Prettier are used to normalize the code style across the project. 
Linting the code make sure there is no error
```shell
yarn lint
```
