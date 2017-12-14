# jobs

> nashdev slack jobs api

[![Build status: Linux](https://img.shields.io/travis/nashdev/jobs.svg?style=flat-square)](https://travis-ci.org/nashdev/jobs)
[![Dependency Status](https://david-dm.org/nashdev/jobs.svg?style=flat-square)](https://david-dm.org/nashdev/jobs)
[![Coverage Status](https://img.shields.io/coveralls/nashdev/jobs/master.svg?style=flat-square)](https://coveralls.io/github/nashdev/jobs?branch=master)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Contributors](https://img.shields.io/github/contributors/nashdev/jobs.svg)](https://github.com/nashdev/jobs/graphs/contributors)
[![license](https://img.shields.io/github/license/nashdev/jobs.svg)](https://github.com/nashdev/jobs/blob/master/LICENSE)
[![Greenkeeper badge](https://badges.greenkeeper.io/nashdev/jobs.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/nashdev/jobs/badge.svg)](https://snyk.io/test/github/nashdev/jobs)

_Note: This initial version was written as part of a live stream at NashJS (7/12/17)... so the code is precarious at best. It is not an endorsement of best practices or code cleanliness. Definitely could use a refactor :stuck_out_tongue:_

### Running Locally

1. Make sure you have [NodeJS](https://nodejs.org/), [npm](https://www.npmjs.com/), and [PostgreSQL](https://www.postgresql.org) installed.

2. Clone the repository
   ```
    git clone git@github.com:nashdev/jobs.git
   ```
3. Install your dependencies
   ```
   cd path/to/nashdev-jobs
   npm install
   ```
4. Copy `.env.example` to `.env` and fill out the values.

5. Start the app

   ```
   npm run start:dev
   ```

6. Once you see `Express server listening on port 3000` in the console, you can View the running app at [http://localhost:3000](http://localhost:3000)

### Running with Docker Locally (recommended)

1. Install [Docker for OSX](https://docs.docker.com/docker-for-mac/) or [Docker for Windows](https://docs.docker.com/docker-for-windows/).
2. Clone the repository

   ```
    git clone git@github.com:nashdev/jobs.git .
   ```

3. Copy the .env.example to .env and fill out the values.

4. Start the app

   ```
   cd path/to/nashdev-jobs
   docker-compose build
   docker-compose up
   ```

5. Once you see the following in the console, you can view the running app at [http://localhost:3000](http://localhost:3000)

   ```
   api_1  | Express server listening on port 3000
   api_1  | webpack built 9e78255fb1ed68765f63 in 9487ms
   ```

## Testing

### Local:

Simply run `npm test` and all your tests in the `test/` directory will be run.

### Docker

Simply run `docker-compose exec api npm run test` and all your tests in the `test/` directory will be run.

## Changelog

**0.0.1**

* Initial release...lots to do.

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
