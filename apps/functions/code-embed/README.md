# Sharingan code snippet renderer
This project take a snippet ID and generate the HTML content to be embedded in a web page.

## Tech stack
* Node.js
* Typescript
* MySQL 8 through PlanetScale
* Prisma

## Prerequisites
Make sure you have this tools installed before running the project
* Node.js 16+
* NPM or Yarn
* AWS CLI v2

## Packages dependencies
We use Yarn workspace to create packages we can share with other applications.
These packages are located in the folder `packages`, so you might need to change the code of one or many packages to implement a feature.
Here are the packages used in this project:

* [@sharingan/database](../../../packages/database)
* [@sharingan/embed](../../../packages/embed)

## Set up
> **Note**: This repo requires a connection to the database, follow the instructions in the **database** packages before going to the next step.


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

| Variable         | Description                                                         |
|------------------|---------------------------------------------------------------------|
| ENV              | Node.js environment (default: development)                          |
| DATABASE_URL     | The database connection string                                      |
| EMBED_STYLE_URL  | The CDN URL of the style to embed in the generated HTML             |
| EMBED_JS_URL     | The CDN URL of the Javascript to embed in the generated HTML        |
| WEB_APP_URL      | URL of the frontend the application that communicates with this app |
| SENTRY_DSN       | Sentry DSN                                                          |

## Test locally
There are two ways to test the Lambda function local:

* **Invocation in the CLI**
You can invoke the function locally for that
1. Edit the `pathParameters` property in the file `src/functions/renderer/mock.json` to set the ID of snippet you want to render
2. run the command below the see to result:

```shell
yarn invoke:local
```

This command will output the HTML content generated.

* **Preview in the browser**
If you want to see a visual result of the generated HTML, run the command below:

```shell
yarn offline
```

Open your brwoser and navigate to [http://localhost:3000/dev/snippets/{id}](http://localhost:3000/dev/snippets/{id})

Replace the parameter `{id}` with the ID of snippet you want to preview.

> **Note**: There is no live reload support so, if you edit the code, you must stop the CLI and rerun `yarn offline`.

## Deploy in dev
* **Method 1**

To deploy from your computer, run the command below:
```shell
yarn deploy:dev
```
The deployment will fail if no value is provided for the property `SENTRY_DSN` so, make sure you provided this value.

* **Method 2**
If you don't want to manage environment variable locally, you can:
1. Commit your changes on your branch
2. Rebase to the main branch
3. Create a branch named `dev` from your current branch
4. Force push and the code will be automagically deployed in dev for you

## Lambda Layers
This function use two Lambda layers:
* **Prisma layer**: contain the Prisma client with the models to interact to our database
* **Shiki layer**: contains the node_modules dependencies for highlighting the code

Using them as layers reduce the bundle size of the Lambda and thus improve the cold start.


### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`
