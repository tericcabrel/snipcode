# Snipcode Web

This project is about the front end of Snipcode. It holds the website landing page, the web application, and the blog pages.

[![Website](https://snipcode.dev/assets/og.png)](https://snipcode.dev)

## Tech Stack
* Next.js
* Tailwind CSS
* Typescript

## Prerequisites
Make sure you have this tools installed before running the project
* Node.js 16+
* NPM or Yarn

## Packages dependencies
We use Yarn workspace to create packages we can share with other applications.
These packages are located in the folder `packages`, so you might need to change the code of one or many packages to implement a feature.
Here are the packages used in the front-end application:

* [@snipcode/utils](../../packages/utils)
* [@snipcode/front](../../packages/front)

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
| Variable                     | Description                                                         |
|------------------------------|---------------------------------------------------------------------|
| NEXT_PUBLIC_APP_ENV          | Environment where the application is running (default: development) |
| NEXT_PUBLIC_GITHUB_CLIENT_ID | GitHub application client ID for authentication with GitHub         |
| NEXT_PUBLIC_SERVER_URL       | URL of the [backend](../core) application                           |
| NEXT_PUBLIC_APP_URL          | URL of this application (default: http://localhost:7500)            |
| NEXT_PUBLIC_SENTRY_DSN       | Sentry DSN                                                          |


Start the application
```bash
yarn dev
```
Open [http://localhost:7500](http://localhost:7500) in your browser to see the page.

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
