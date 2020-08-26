# Quizus Repository

## Installation

Follow these steps to get the project up and running on your machine:
1. `git clone` this Repository
2. Copy `server/sample.yml` to `server/config.yml`
3. Update `server/config.yml` to your use case
4. Run `npm i` inside the project directory to install all dependencies
5. `npm start` inside the project folder

## Dependencies

1. [MongoDB Instance](https://nodejs.org/en/)
2. [NPM/NodeJS](https://nodejs.org/en/)
3. [Git](https://git-scm.com/downloads)

## HTTP/Socket

The server is set up in such a way to separate the HTTP requests from the Socket requests. The application utilizes both a Socket connection inside of a room and normal HTTP request/response cycles when on the landing page.

## Building for QA/Production

Before pushing any client changes, make sure to run `npm build` in order to build the client application for the servers that will run it.

## Security

This repository is a private repository and is not to be shared in any way without direct approval of the project's administrator.
Please make sure to **NOT** upload your edited `server/config.yml` file!!! No sensitive data should live on the Repo.