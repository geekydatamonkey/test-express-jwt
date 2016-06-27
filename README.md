# Testing JWT Auth and Express

Simple app where quotes are protected behind authentication using JWT.

## Get Started (Development)

1. `git clone`
2. `npm install` to install dependencies
3. `npm start` to start the server

## Production

This comes with a `settings.dev.json` file, which should only be used in development mode.

You should create a new settings file and secret for production.

1. `cp settings.dev.json settings.production.json`
2. Generate a new random secret:
  ```
  $ node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
  ```
3. In `settings.production.json`, replace `jwt.secret` with the new secret.
4. `npm run build`
5. `NODE_ENV=productionnpm run serve`
