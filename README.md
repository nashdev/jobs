# jobs

> nashdev slack jobs api

_Note: This initial version was written as part of a live stream at NashJS (7/12/17)... so the code is precarious at best. It is not an endorsement of best practices or code cleanliness. Definitely could use a refactor :stuck_out_tongue:_

### Running Locally 

1. Make sure you have [NodeJS](https://nodejs.org/), [npm](https://www.npmjs.com/), and [PostgreSQL](https://www.postgresql.org) installed. 

2. Clone the repository 
    ```
     git clone git@github.com:egdelwonk/nashdev-jobs.git
    ```
2. Install your dependencies
    ```
    cd path/to/nashdev-jobs
    yarn install
    ```
3. Copy `.env.example` to `.env` and fill out the values.

4. Start the app

    ```
    yarn run start:dev
    ```
5.  Once you see `Express server listening on port 3000` in the console, you can View the running app at [http://localhost:3000](http://localhost:3000)

### Running with Docker Locally (recommended)
1.  Install [Docker for OSX](https://docs.docker.com/docker-for-mac/) or [Docker for Windows](https://docs.docker.com/docker-for-windows/). 
2. Clone the repository 

    ```
     git clone git@github.com:egdelwonk/nashdev-jobs.git .
    ```
3. Copy the .env.example to .env and fill out the values.

4.  Start the app

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

__0.0.1__

- Initial release...lots to do.

## Contributing 

Bug reports and pull requests are welcome on GitHub at https://github.com/egdelwonk/nashdev-jobs/. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](CONTRIBUTING.md) code of conduct.

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
