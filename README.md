# Introduction

Starter code used with serverless faundb tutorial article.
&nbsp;

# Prerequisites and Configuration

 - Configured AWS CLI with administrator IAM role.
 - Create a database with faunadb and store access secret in a new file `env.json` in project root directory. File content should be as following where xxxxx is replaced with your access secret
```json
{
    "FAUNADB_SECRET_KEY":"xxxxx"
}
```
 - Install `serverless` as a global npm package

```bash
npm install -g serverless
```
 - Install local dependencies
```bash
npm install
```

 - Execute `fauna-setup.js` with node environment to setup Collections and Indexes in fauna Database

```bash
node fauna-setup.js
```
&nbsp;

# Deploy to AWS

Simply run the following command in terminal inside project root.
```bash
serverless deploy
```

If everything goes well, after few minutes, last few lines of the final output should look like the following text.\
'xxx' will be replaced with a unique id for your service
```
...
...
Service Information
service: serverless-faunadb-test-starter
stage: dev
region: us-east-1
stack: serverless-faunadb-test-starter-dev
resources: 56
api keys:
  None
endpoints:
  POST - https://xxx.execute-api.us-east-1.amazonaws.com/dev/users
  GET - https://xxx.execute-api.us-east-1.amazonaws.com/dev/users
functions:
  create: serverless-faunadb-test-starter-dev-create
  list: serverless-faunadb-test-starter-dev-list
layers:
  None
```
Now the service is deployed in AWS region `us-east-1` and you can check the created resources by login into AWS console and visiting https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks . It should show a new stack called `serverless-faunadb-test-starter-dev`

&nbsp;

# Usage

Now you can use the API to do following tasks
 - Create user
 - List users

## Create a user

```bash
curl --request POST https://xxx.execute-api.us-east-1.amazonaws.com/dev/users --header "Content-Type: application/json" --data-raw '{"name":"Test user 1", "dob":"2000-01-01","email":"abc@abc.com","city":"Downtown"}'
```

Example Result:

*'id' field value might be different.*
```bash
{"status":"SUCCESS","data":{"user":{"name":"Test user 1","dob":"2000-01-01","city":"Downtown","email":"abc@abc.com","id":"288601255069090308"}}}
```

## List users

```bash
curl https://xxx.execute-api.us-east-1.amazonaws.com/dev/users
```

Example output:
```bash
{"status":"SUCCESS","data":{"users":[{"name":"Test user 2","dob":"1990-03-15","city":"New City","email":"test@abc.com","id":"288254855497122309"},{"name":"Test user 1","dob":"2000-01-01","city":"Downtown","email":"abc@abc.com","id":"288601255069090308"}]}}

```

&nbsp;

## Offline (Local) Execution
If you are on a Windows environment with VSCode editor, you will be able to use `.vscode/launch.json` to directly run this service in your local machine. For other environments the same file can be used with minor modifications. \
&nbsp;

When running locally, URL s will be prefixed as `localhost`. For example https://xxx.execute-api.us-east-1.amazonaws.com/dev/users is changed to http://localhost:3333/dev/users when running locally.