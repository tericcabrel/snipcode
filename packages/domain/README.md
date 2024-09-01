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

### Start the local database and run the migrations
```shell
yarn db:local
yarn db:migrate
```

### Generate Prisma types and seed the database with default data
```shell
yarn db:generate
yarn db:seed
```

To stop the local database run the command below:
```shell
yarn db:local:stop
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

Build the package to generate types declaration required to provide autocompletion while using the functions in the backend application
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
