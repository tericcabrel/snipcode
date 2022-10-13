# Sharingan Embed
This package contains the code related to generate the embeddable code snippet as HTML.
For a snippet's id, It's generate the HTML code you can embed on your website through an Iframe

## How it works?
- We build the HTML page using the CSS and Javascript.
- Preview the result in the browser
- Once the page is great, we publish the CSS and JS on NPM, so we can serve it through a CDN ([JSdelivr.com](https://jsdelivr.com))

## Prerequisites
Make sure you have this tools installed before running the project
* Node.js 16+
* NPM or Yarn

> **Note**: This repo requires a connection to the database, follow the instructions in the **database** packages before going to the next step. 

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

Start the database locally, go to the [database's package](../database) and run the command
```shell
yarn db:dev
```

## Start the watcher for the CSS and JS
It watches any change in the folder `src/styles` for the CSS and `src/scripts` for the JS; 
rebuild them and generate the output in the `build` folder.

The CSS an JS generated are also copied in the folder `server/public`; this is required to replicate
locally the loading from the CDN.
We use [tsup](https://github.com/egoist/tsup) under the hood to make this possible. Check out the file [tsup.config.ts](./tsup.config.ts)

To start the watcher, run the command:
```shell
yarn build:cdn:watch
```

## Preview a snippet
To preview the snippet embed page, start the Node.js server:
```shell
yarn dev
```
Open the browser and navigate to the URL `http://localhost:7502/snippets/:id`. <br/>
The `:id` must replaced with the snippet's id you want to preview.<br/>
Use a GUI DB client to find an ID in the snippets table.

### Preview the snippet in an Iframe
To see how the snippet looks like in an iframe, edit the file [src/server/static/index.html](./src/server/static/index.html) to set the URL of iframe
save. The URL follows this pattern: `http://localhost:7502/snippets/:id`.

Run the command below:
```shell
yarn iframe:preview
```
Navigate to the URL `http://localhost:7503` to see the result.

## Publish the assets on NPM
This part is handled inside the CI/CD, so it will not be useful to do it locally:
```shell
# Generate the assets optimized for production
yarn build:cdn
cp package.publish.json build/package.json
cd build
# Authenticate to NPM
npm adduser
# Publish the package on NPM
npm publish --access=public
```

Before publishing, make sure to upgrade the package version in the file [package.publish.json](./package.publish.json) . Check out the [Semantic versioning](https://docs.npmjs.com/about-semantic-versioning) to see how to define the version number.

## Build TS library
This package also expose functions used in others packages or apps. Run the command below to build them 
```shell
yarn build:lib
```


