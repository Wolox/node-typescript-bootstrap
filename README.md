# typescript-base

Example base for typescript projects

## Table of contents
* [First steps](#first-steps)
  + [Installing node](#installing-node)
  + [Install dependencies](#install-dependencies)
  + [Database configuration](#database-configuration)
  + [Migrations](#migrations)
  + [Starting your app](#starting-your-app)
* [Development](#development)
  + [Environments](#environments)
  + [Working with TypeScript](#working-with-typescript)
  + [Logging](#logging)
  + [Testing](#testing)
  + [Debugging](#debugging)
  + [REPL console](#repl-console)
  + [Documentation](#documentation)
* [Deploy](#deploy)
  + [Heroku](#heroku)
* [Contributing](#contributing)
* [About](#about)
* [License](#license)

## First steps

### Installing node
Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm)
Nvm approach is preferred.

### Install dependencies
Run `npm install` or `yarn` from rootpath of the project.

### Database configuration
Before running the app, make sure you have [postgresql installed](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-14-04) and a db created, to create it run the following steps inside a psql terminal:
1. `CREATE DATABASE db_project_name;`
2. `\c db_project_name;`
3. `CREATE ROLE "project_name" LOGIN CREATEDB PASSWORD 'project_name';`

Then, set in `.env` file following variables:

```
DB_HOST="localhost"
DB_PORT=5432
DB_USERNAME="project_name"
DB_PASSWORD="project_name"
DB_NAME="db_project_name"
DB_NAME_DEV="db_project_name_dev"
DB_NAME_TEST="db_project_name_test"
```

### Migrations

To create a migration simply run `./node_modules/.bin/sequelize migration:create --name="my-migration-name" --config ./migrations/config.js --migrations-path ./migrations/migrations`.

To run them, execute `npm run migrations`.

### Starting your app
Now, to start your app run `npm start` in the rootpath of the project. Then access your app at **localhost:port**, where the port was logged into the console at startup.

## Development

### Environments
By default, the environment will be **development**, but you can change it easily using the **NODE_ENV** environmental variable.

#### Environment variables
`Dotenv` is used for managing environment variables. They are stored in the `/.env` file. Take into account that the variables defined in the `bashrc` are not overrided.

The environment variables should be added to the `.env` file in the form of `NAME=VALUE`, as the following example:
```
DB_USERNAME="root"
DB_PASS="superpass"
DB_PASSWORD="superpass"
PORT=8081
CLIENTS_API="http://api.clients.example.org/"
```

**Remember not to push nor commit the `.env` file.**

### Working with TypeScript

In the next few sections I will call out everything that changes when adding TypeScript to an Express project. Note that all of this has already been setup for this project, but feel free to use this as a reference for converting other Node.js projects to TypeScript.

#### Libraries and type definition (.d.ts files)

TypeScript is a superset of JavaScript, thus we should be able to use the same packages for both. Some of them are already written in TypeScript and expose their types for us to use.

When the package you want to implement is not written in TypeScript, you can look up for it on [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) and install it using: `npm install --save-dev @types/your-package`.

> **Note!** Use flag `--save-dev` (or `-D`) in order to save `.d.ts` as dev dependencies. They are only used at compile time.

If your package is not defined on DefinitelyTyped neither, you will have to create your own `.d.ts` file.

Compiler looks for type definition files in `node_modules/@types` by default. But we will want to help it find our own `.d.ts` files, in order to accomplish this we have to configure [path mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) in our `tsconfig.json`.

In the tsconfig.json for this project you'll see the following:

```json
"paths": {
  "*": [
    "node_modules/@types/*",
    "types/*"
  ]
},
```

This instructs TypeScript compiler to first looks in `node_modules/@types` and then, when it doesn't find one, look on our own `.d.ts` files located on the folder `./types`.

##### Using dts-gen

Unless you are familiar with `.d.ts` files, it is recommended to use a tool to generate `.d.ts` files for this libraries. [dts-gen](https://github.com/Microsoft/dts-gen) is a tool that generates TypeScript definition files (.d.ts) from any JavaScript object.

This trade-off comes with a price -- you'll see a lot of anys in function parameters and return types. You may also see properties that are not intended for public use. dts-gen is meant to be a starting point for writing a high-quality definition file.

### Logging
To log useful information of your program to the console you just need to import the logger located at `app/logger`. There are two possible types of logging: `info` and `error`. You should use them depending on the type of message you want to show.

Here is an example snippet:

```javascript
const logger = require('/app/logger');

if (error) { 
    logger.error('There is an error');
} else {
    logger.info('There is no error');
}
```

### Testing

To run your tests you first need to config your testing database by setting the env var `DB_NAME_TEST`. as explained
before in [Database configuration](#database-configuration). Also you need to run the migrations in this exclusive
testing database each time you have new ones, you can do this by running the command `npm run migrations-test`.
Once you have all the above done you can run your tests with the following command: `npm test`. For more information refeer to the documentation of [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).

### Debugging

In order to debug our Node.js application, we enable 'sourceMap' in `tsconfig.json`, this compiler option generates corresponding `.map` files from original Javascipt counterpart. This change is mandatory to attach a debugger, otherwise it wouldn't be able to match transpiled files with their originals.

In VSCode, you will need to add an `./.vscode/launch.json` file in order to launch the debugger. You can use the following:

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/server.ts",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "restart": true,
      "outFiles": [
        "${workspaceFolder}/dist/**/*.js"
      ]
    }
  ]
}
```

### REPL console
We can use a node console with `npm run console`. There your service objects are exposed as _servicename_ + "Service". Let's suppose that we have a service `users` which has a function `getAll`. In your console you can call `usersService.getAll()` and see the result. Note that this works also with functions that return promises! To exit the console use `.exit`.

### Documentation
Documentation will be served at `/docs`. Remember using [dictum.js](http://www.github.com/Wolox/dictum.js) package to automatically generate documentation for your endpoints. Check [this link](https://github.com/Wolox/dictum.js#chai) for further details.

## Deploy

### Heroku
Pushing the desired branch to heroku should be enough.
For more information check: https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Run the tests (`npm test`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create new Pull Request

## About

This project is maintained by [Wolox](https://github.com/wolox) and it was written by [Wolox](http://www.wolox.com.ar).

![Wolox](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)

## License

**typescript-base** is available under the MIT [license](LICENSE.md).

    Copyright (c) 2019 Wolox

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
