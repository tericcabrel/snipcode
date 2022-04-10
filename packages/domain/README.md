# Sharingan Domain

This package contains all the business logic of the project

## Tech Stack
* Node.js
* Typescript

## Prerequisites
Make sure you have this tools installed before running the project
* Node.js 14+
* NPM or Yarn
* Docker

## Set up the project
Delete the existing folders output from build commands
```shell
yarn clean
```
Install node modules
````shell
yarn install
````
Create the .env file from the template. This file is useful for test executions, so you don't have to edit any properties in the file.
```shell
cp .env.template .env
```

Build the package to generate types declaration required to provide autocompletion while using the functions in the core or web applications
```bash
yarn build
```
A `dist` folder will be generated.

## Running tests
If you are running tests that require a database, you must start one with Docker.

Start the Docker database
```shell
yarn db:test
```
Stop the Docker database
```shell
yarn db:test:stop
```
Run the migration to load the database schema
```shell
yarn db:test:migration
```

There are three command to run tests where each command has a specific purpose:
- `yarn test:unit`: use this command when you want to test unit functions


- `yarn test`: use this command to run functions that require database or not. Everytime you run a test, the migration will be executed against the database
which add 5-10 seconds on test execution time. This command is appropriate inside a CI Pipeline


- `yarn test:db:local`: This command run functions that require database or not but, it doesn't execute the migration, so it is faster than the former.

To run a specific test file, append the filename after the command:
```shell
yarn test user.service.test.ts
# or
yarn test:unit user.service.test.ts
# or
yarn test:db:local user.service.test.ts
```

## Lint the project
ESLint and Prettier are used to normalize the code style across the project. 
Linting the code make sure there is no error
```shell
yarn lint
```
