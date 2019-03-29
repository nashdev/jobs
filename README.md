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

1.  Make sure you have [NodeJS](https://nodejs.org/), [npm](https://www.npmjs.com/), and [PostgreSQL](https://www.postgresql.org) installed.

2.  Clone the repository
    ```
     git clone git@github.com:nashdev/jobs.git
    ```
3.  Install your dependencies
    ```
    cd path/to/nashdev-jobs
    npm install
    ```
4.  Copy `.env.example` to `.env` and fill out the values.

5. Set up the development database

    ```
    npm run setup
    ```

6.  Start the app

    ```
    npm run start
    ```

7.  Once you see `Express server listening on port 3000` in the console, you can View the running app at [http://localhost:3000](http://localhost:3000)

## Slack Integration

1. Create a new app by navigating to https://api.slack.com/apps?new_app=1.  You will need to log in to one of your Slack Workspaces so that the app can be added to it, and, if possible, you should choose one where you are an Owner or Admin, as you will have to approve the app being attached to that Workspace.
2. Click on 'Basic Information' and add the 'Client ID' and 'Client Secret' to the `.env` file.
    1. `SLACK_CLIENT_ID=''` ("Basic Information > Client ID")
    2. `SLACK_CLIENT_SECRET=''` ("Basic Information > Client Secret")

#### Slack OAuth Setup

1. Go to the "Features > OAuth & Permissions" and click "Add New Redirect URLs".
2. Add the value `http://localhost:3000/slack/auth` as a redirect URL.

#### Slack Bot Setup

1. Create a Bot User by going to "Features > Bot Users" and entering a display name and default username and then saving.
2. Go to the "Features > OAuth & Permissions" section, click "Install App to Workplace".
2. Next, scroll down to "Scopes", and copy and paste each of the following permissions, one at a time, into the "Select Permission Scopes" field.  The related permission should then be highlighted for you to select and add to your list of Scopes:
   1. `chat:write:user`
   2. `bot`
   3. `users.profile:read`
3. Update the SLACK_BOT_TOKEN in your .env file with the newly generated values now provided on the indicated pages of your new Slack app:
   1. `SLACK_BOT_TOKEN=''` ("OAuth & Permissions > Bot User OAuth Access Token")

## Testing

### Local:

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Contributions

If you would like to contribute, you can check out all open issues/feature requests or submit your own on our [Issues](https://github.com/nashdev/jobs/issues) page (look for "enhancement" and "help wanted" labels). If you find an issue you would like to work on, you can complete the following steps to submit a pull request:
1. Fork the repository
2. Add any code changes inside the forked repository
3. Submit pull request to our `master` branch

## Changelog

**0.0.1**

- Initial release...lots to do.

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
