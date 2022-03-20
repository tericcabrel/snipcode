# Sharingan Core

This is the core backend of Sharingan. All the business logics behind this application are implemented here. 

## Tech Stack
* Node.js
* Typescript
* GraphQL
* MySQL

## Prerequisites
Make sure you have this tools installed before running the project
* Node.js 14+
* NPM or Yarn
* Docker
* AWS CLI v2

## Packages dependencies
We use Yarn workspace to create packages we can share with others applications. 
These packages are located in the folder `packages` so, you can find yourself needing to change
 code inside one or many packages to implement a feature. Here are the packages used in the core backend application:

* common

## Set up the project
Delete the existing folders output from build commands
```shell
yarn clean
```
Install node modules
````shell
yarn install
````
Create configuration file from the template
```shell
cp .env.template .env

# Edit configuration to match your local environment and save
nano .env
```
| Variable | Description                                                            |
|----------|------------------------------------------------------------------------|
| HOST     | Host name where the application is running (default: http://localhost) |
| PORT     | Port number of the application (default: 7500)                         |

Start Application
```bash
yarn dev
```
The application will be launched by [Nodemon](https://nodemon.com).

Open [http://localhost:7500](http://localhost:7500) with your browser to see the result.

## Running tests
Run the command below to run all the tests
```shell
yarn test
```
To run a specific test file, append the filename after the command
```shell
yarn test controller.test.ts
```

## Lint the project
ESLint and Prettier are used to normalize the code style across the project. 
Linting the code make sure there is no error
```shell
yarn lint
```
