# Testing JWT Auth and Express

Simple app where quotes are protected behind authentication using JWT.

## Get Started (Development)

1. `git clone`
2. `npm install` to install dependencies
3. `npm start` to start the server

Then, to get a new JWT, you'll need to login (using Postman or some other tool)

## To Login

`POST http://localhost:3000/login`
  - username: `admin`
  - password: `54321`

Example:

```sh
$ curl -X POST --data 'username=admin&password=54321' http://localhost:3000/login

{
  "success":true,
  "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiI1NDMyMSIsImlhdCI6MTQ2Njk5NTk5MywiZXhwIjoxNDY3MDgyMzkzfQ.iPKqdFi3Fg71okTWHxpfKQUc1KvZ36PP3bmfP_Cu50Y"
}
```

The `token` is your JWT, which can be used to access the API.

## To get quotes
`GET http://localhost:3000/quotes`
  - Headers
    - Authorization: `Bearer YOUR_JWT_GOES_HERE`
``

Example:

```sh
$ curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiI1NDMyMSIsImlhdCI6MTQ2Njk5NTk5MywiZXhwIjoxNDY3MDgyMzkzfQ.iPKqdFi3Fg71okTWHxpfKQUc1KvZ36PP3bmfP_Cu50Y" http://localhost:3000/quotes

[
  {"author":"Audrey Hepburn","text":"Nothing is impossible, the word itself says 'I'm possible'!"},
  {"author":"Walt Disney","text":"You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  {"author":"Unknown","text":"Even the greatest was once a beginner. Don't be afraid to take that first step."},
  {"author":"Neale Donald Walsch","text":"You are afraid to die, and you're afraid to live. What a way to exist."}
]
```

## Build and Deploy to Production

This comes with a `settings.dev.json` file, which should only be used in development mode.

You should create a new settings file and secret for production.

1. `cp settings.dev.json settings.production.json`
2. Generate a new random secret:
  ```
  $ node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
  ```
3. In `settings.production.json`, replace `jwt.secret` with the new secret.
4. `npm run build`
5. `NODE_ENV=production npm run serve`
