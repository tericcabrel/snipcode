# Sharingan Core

This is the core backend of Sharingan. All the business logic behind this application is implemented here. 

## Tech Stack
* Node.js
* Typescript
* GraphQL
* MySQL 8 through PlanetScale
* Prisma

## Prerequisites
Make sure you have this tools installed before running the project
* Node.js 16+
* NPM or Yarn
* Docker
* AWS CLI v2

## Packages dependencies
We use Yarn workspace to create packages we can share with other applications.
These packages are located in the folder `packages`, so you might need to change the code of one or many packages to implement a feature.
Here are the packages used in the front-end application:

* [@sharingan/database](../../packages/database)
* [@sharingan/domain](../../packages/domain)
* [@sharingan/logger](../../packages/logger)
* [@sharingan/utils](../../packages/utils)

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

**Environment variables list**

| Variable             | Description                                                              |
|----------------------|--------------------------------------------------------------------------|
| NODE_ENV             | Node.js environment (default: development)                               |
| HOST                 | Host name where the application is running (default: http://localhost)   |
| PORT                 | Port number of the application (default: 7501)                           |
| ENABLE_INTROSPECTION | Enable/Disable GraphQL introspection (must `false` in production)        |
| DATABASE_URL         | URL of the database                                                      |
| ADMIN_PASSWORD       | Password of the default admin user.                                      |
| CONVERTKIT_API_KEY   | ConvertKit API key                                                       |
| CONVERTKIT_FORM_ID   | ConvertKit Form ID                                                       |
| CONVERTKIT_TAG_ID    | ConvertKit Tag ID                                                        |
| REQUEST_TIMEOUT      | Max duration of a request (default: 30 seconds)                          |
| GITHUB_CLIENT_ID     | GitHub application client ID for authentication with GitHub              |
| GITHUB_CLIENT_SECRET | GitHub application client secret for authentication with GitHub          |
| WEB_APP_URL          | URL of the frontend the application that communicates with this app      |
| WEB_AUTH_SUCCESS_URL | Callback URL of the frontend application when the authentication succeed |
| WEB_AUTH_ERROR_URL   | Callback URL of the frontend application when the authentication failed  |
| SESSION_LIFETIME     | The session's lifetime when a user authenticate (default: 90 days)       |
| SENTRY_DSN           | Sentry DSN                                                               |
| SENTRY_ENABLED       | Enable/Disable Sentry                                                    |

Start the application
```bash
yarn dev
```
The application will be launched by [Nodemon](https://nodemon.com).

Open [http://localhost:7501/graphql](http://localhost:7501/graphql) in your browser and use Apollo studio explorer to test your GraphQL queries and mutations.

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
