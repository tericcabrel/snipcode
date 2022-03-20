# Sharingan Core

This is the frontend of Sharingan. It holds the website landing page, the web application and the blog pages

## Tech Stack
* Next.js
* Tailwind CSS

## Prerequisites
Make sure you have this tools installed before running the project
* Node.js 14+
* NPM or Yarn

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
cp .env.template .env.local

# Edit configuration to match your local environment and save
nano .env.local
```
| Variable | Description                                                         |
|----------|---------------------------------------------------------------------|
| APP_ENV  | Environment where the application is running (default: development) |                     |


Start Application
```bash
yarn dev
```
The application will be launched by [Nodemon](https://nodemon.com).

Open [http://localhost:7501](http://localhost:7501) with your browser to see the result.

## Running tests
Run the command below to run all the tests
```shell
yarn test
```
To run a specific test file, append the filename after the command
```shell
yarn test home.test.ts
```

## Lint the project
ESLint and Prettier are used to normalize the code style across the project.
Linting the code make sure there is no error
```shell
yarn lint
```
