# Snipcode Domain

This package contains:
* The entities and data access layer that can be used in the Backend.
* The business logic of the project
* The database migrations and entities managed by the ORM Prisma


## Prerequisites
Make sure you have this tools installed before running the project
* Node.js 20+
* Yarn 4
* Docker
* [The PlanetScale CLI](https://planetscale.com/cli)

## Set up the project
Delete the existing folders output from build commands
```shell
yarn clean
```

Install the Node modules
````shell
yarn install
````

Create the .env file from the template. This file is useful for test executions, so you don't have to edit any properties in the file.
```shell
cp .env.template .env
```

### Connect to the local database locally
This project uses PlanetScale as the database.<br>
To connect to the database locally, you must authenticate first (Ask the credentials to [@tericcabrel](https://github.com/tericcabrel)).<br>
Once authenticated from the terminal, execute the commands below on two separate terminals.
```shell
# On a first terminal
yarn db:dev
# On a second terminal (only necessary if you update the prisma schema)
yarn db:shadow
```

The shadow database runs on Docker, you can stop it when you don't need it
```shell
yarn db:shadow:stop
```

### Run the database migration, generate Prisma types and seed the database with default data
```shell
yarn db:generate
yarn db:migrate
yarn db:seed
```

### Generate a database migration
To create a database migration that generate the SQL file, run the command below:
```shell
yarn db:migrate --name <migration-name>
```

### Others Prisma commands
- Reset the database without seeding: `db:reset`
- Reset the database with seeding: `db:reset:seed`
- Open Prisma Studio to browse your database: `db:view`
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
The command to run tests starts a Docker container of a MySQL database, it is required to execute functional tests.
After the container has started, we execute the database migration or reset all the database tables.

Run command below to execute tests
```shell
yarn test
```

To run a specific test file, append the filename after the command:
```shell
yarn test user.service.test.ts
```

Run the command below to stop the Docker container for the database
```shell
yarn db:test:stop
```

## Lint the project
ESLint and Prettier are used to normalize the code style across the project. 
Linting the code make sure there is no error
```shell
yarn lint
```
