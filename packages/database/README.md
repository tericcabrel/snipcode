# Sharingan Database

This package contains all the entities and data access layer that can be used in the Backend or Lambda functions

## Tech Stack
* Node.js
* Typescript

## Prerequisites
Make sure you have this tools installed before running the project
* Node.js 14+
* NPM or Yarn

## Set up the project
Delete the existing folders output from build commands
```shell
yarn clean
```
Install node modules
````shell
yarn install
````

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
yarn test index.test.ts
```

## Lint the project
ESLint and Prettier are used to normalize the code style across the project. 
Linting the code make sure there is no error
```shell
yarn lint
```
