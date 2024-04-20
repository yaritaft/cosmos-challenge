- TESTING
- Test it manually
- DEPLOY SOLUTION

- FINISH README

- Explain refactoring constraints and how they were handled
- Explain strategy thing and interface segregation
- Explain retry library + why exponential and why not promise all
- Explain clean arch and strategy
- Secure note
- Setup env vars on deployment server and secure note for api key

# Cosmos challenge

You have to create an automatic way of creating megaverses and wipe them out. With given API and Candidate ID.

### Features

- [] Create `megaverse` with a given candidate id.
- [] Wipe current `megaverse`.

### Author

Yari Ivan Taft

- GitHub: https://github.com/yaritaft
- Website: http://yaritaft.com
- LinkedIn: https://www.linkedin.com/in/yari-ivan-taft-4122a7153/

### Badges

[![Build Status](https://travis-ci.org/yaritaft/microservices_flask_challenge_bkr.svg?branch=master&status=passed)](https://travis-ci.org/yaritaft/microservices_flask_challenge_bkr)
[![Coverage Status](https://coveralls.io/repos/github/yaritaft/microservices_flask_challenge_bkr/badge.svg?branch=master)](https://coveralls.io/github/yaritaft/microservices_flask_challenge_bkr?branch=master)

## Table of contents

- [Technology](#Technology)
- [Routes](#Routes)
- [PreRequisites](#Pre-requisites)
- [Run APP](#Run-APP)
- [Run tests](#Run-tests)
- [Deployment](#Deployment)

## Technology

- Programming languaje: Typesscript
- APP Framework: Nest JS
- Containers: Docker, Docker-compose
- Deployment: Coveralls and Travis

## Routes

- API swagger: http://localhost:3000/api#/Cosmos/CosmosController_solveMap

## Pre-requisites

- Docker and docker compose installed.
- Linux/Mac terminal (Or emulated linux on Windows)
- No services running on localhost port 3000.
- API Key:

## How to get the API KEY

1. Go here https://www.devglan.com/online-tools/text-encryption-decryption
2. Paste the encrypted password given on the email on the `Text to Decrypt` text box.
3. Check Decryption rquires a custom secret key
4. Paste the candidate id
5. Copy the Decrypted text and use that as API KEY on swagger. (By clicking the lock on the top right corner)

### Run APP

1. Execute script to run the app.

```
chmod 777 ./up_dev.sh
./up_dev.sh
```

2. Go to the swagger and test the app or consume api through curl or postman.

3. Press Control + C to stop the app.

### Run tests

Being at the same point before last step type:

```
chmod 777 ./up_test.sh
./up_test.sh
```

### Deployment

There is a build in a remote environment in Travis. That platform checks that
the build is valid and that none of the tests are failing. If everything is
okay, then the code coverage is sent to coveralls and in that site the test
coverage can be reviewed in detail.
