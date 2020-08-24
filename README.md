# Quizus Repository

## Installation

Follow these steps to get the project up and running on your machine:
1. Copy & rename `samp-config.yml` to `config.yml`
2. Update config to your settings, make sure to include DB details
3. `npm start` inside the project folder

## Dependencies

1. [MongoDB Instance](https://nodejs.org/en/)
2. [NPM/NodeJS](https://nodejs.org/en/)
3. [Git](https://git-scm.com/downloads)

## Requests/Events

There are different folders for both HTTP requests and for Socket events/connections.

## Jobs

Jobs are scheduled tasks. All Jobs should export a function that takes at least 1 argument. The first argument should always be the timeout time. For example,
```javascript
module.exports = (timeout, data) => setTimeout(() => doStuff(data), timeout);
```

## Load

Load files are dedicated to loading external resources in that are not NPM packages. This includes loading the database, loading a configuration file, etc.

## Utilities

Utilities should be exported as class instances. Depending on the utility, you can assign these to either global variables in the `server.js` main file, or you can load them wherever needed.

## Validation

Validation files should always return Promises when called, in order to provide in-line validation to controllers (or other) in a chain of promises.

## Security

This repository is a private repository and is not to be shared in any way without direct approval of the project's administrator.
Please make sure to **NOT** upload your edited `config.yml` file!!! No sensitive data should live on the Repo.