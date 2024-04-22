# Megaverse challenge

You have to create an automatic way of creating megaverses and wipe them out. With given API and Candidate ID.

### Warning

Locally it creates and deletes elements properly with a proper response.
On Heroku it also creates and deletes elements properly but the response is 503 due to the speed of the API that we are calling. It keeps deleting or creating after response anyway. The max timeout value in heroku is 30 seconds.

Tried to improve the speed with promise all with every request and also tried promise all with 5 elements chunks but It was even worse because more `too many multiple requests 429` were received. That's the reason it is done one by one with the retry. It is slow but It is working fine.

Things that can be done with this:

1. We can always answer 201 and process it in an asynchronous way. After processing we can send and email or push notification to notify the user the result of the process.
   (I think this is one the best options)
   There's some other apps that do this, like twitch downloading the streamed videos, american express with old statements, etc.

2. We can do this with websockets to keep the connection alive until we finish processing.

3. If we are able we can improve the Crossmint API, it would be better to create a "Bulk create" and "Bulk delete". In that way we can send a list and make it way faster without having to handle too mnay request.
   (I think this is another great option if we are able to do it)

4. If we are able we can improve the Crossmint API, we can add support for multiple requests at the same time with more API instances or threads for example.

### Badges

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/DVoiAwDzmMcvshPZnm3jCP/ASAErrsAbrCMQahxbmgeyR/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/DVoiAwDzmMcvshPZnm3jCP/ASAErrsAbrCMQahxbmgeyR/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/yaritaft/cosmos-challenge/badge.png?branch=master)](https://coveralls.io/github/yaritaft/cosmos-challenge?branch=master)

### Decisions taken

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

## Table of contents

- [Technology](#Technology)
- [Routes](#Routes)
- [PreRequisites](#Pre-requisites)
- [Run APP](#Run-APP)
- [Run tests](#Run-tests)

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
- API Key

## How to get the API KEY

1. Go here https://www.devglan.com/online-tools/text-encryption-decryption
2. Paste the encrypted password given on the email on the `Text to Decrypt` text box.
3. Check Decryption requires a custom secret key
4. Paste the candidate id
5. Copy the Decrypted text and use that as API KEY on swagger. (By clicking the lock on the top right corner)

### Run APP with Docker

1. Execute script to run the app.

```
chmod 777 ./up_dev.sh
./up_dev.sh
```

2. Go to the swagger http://localhost:3000/api and test the app or consume api through curl or postman with default api key: `defaultApiKey`

3. Press Control + C to stop the app.

### Run tests with Docker

Being at the same point before last step type:

```
chmod 777 ./up_test.sh
./up_test.sh
```

### Things to improve

- The retrials were possible to test manually but due to JEST constraints I wasn't able to test it automatically.
  Did a deep research to find out this.
- On Heroku the max timeout response is 30 seconds. That's why you will get a 503 error. Although the elements will keep
  being erased after you get the response. The endpoint does the task properly.

### Run the JSON Server for manual testing

#### Manually

```
pip install virtualenv
python -m virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
python json-server.py
```
