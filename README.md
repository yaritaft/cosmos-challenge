- DEPLOY SOLUTION
- PRE COMMIT
- FINISH README
- TRAVIS
- COVERALLS

# Megaverse challenge

You have to create an automatic way of creating megaverses and wipe them out. With given API and Candidate ID.

### Badges

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/DVoiAwDzmMcvshPZnm3jCP/ASAErrsAbrCMQahxbmgeyR/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/DVoiAwDzmMcvshPZnm3jCP/ASAErrsAbrCMQahxbmgeyR/tree/main)
[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/DVoiAwDzmMcvshPZnm3jCP/ASAErrsAbrCMQahxbmgeyR/tree/circleci-project-setup.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/DVoiAwDzmMcvshPZnm3jCP/ASAErrsAbrCMQahxbmgeyR/tree/circleci-project-setup)

### Decisions taken

- Since I have lost access to the API after solving the challenge I had to create an API server to simulate responses. I will leave it inside the repo
  under the name of json-server.py
- I implemented an strategy design pattern for abstracting the specific strategy behind each element while creating or erasing. This allows to reuse code and use polymorphic strategies.
  It is also easy to add more strategies without changing the core code.
- Created a core module to split outside communication from the app domain.
- Used clean architecture by splitting outside communication from app domain. And the app domains is splitted into controller, service, repository and client.
- Since the API usually throws 429 to many requests a retrial strategy was applied. It increments the amount of time waited in each try.
- The code to fix the excersice was basically done to check the core logic. Then the rest of the logic was made based on that logic and with a json server due to the lack of access of the api.
- A squash commit was made to fix the history since some html files were accidentally added from code coverage inside a commit.
- API key was applied to the app to improve security.
- Env vars were handled with `config` library.

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

### Things to improve

The retrials were possible to test manually but due to JEST constraints I wasn't able to test it automatically.
Did a deep research to find out this.

### Run the JSON Server for manual testing

#### Manually

```
pip install virtualenv
python -m virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
python json-server.py
```
