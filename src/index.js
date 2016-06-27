import express from 'express';
import bodyParser from 'body-parser';
import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';
import Users from './Users';
import quotes from './quotes';
import { loadSettingsSync } from './helpers';

const settings = loadSettingsSync();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressJWT({ secret: settings.jwt.secret }).unless({ path: ['/login'] }));

// Routes
app.get('/quotes', (req, res) => {
  res.json(quotes);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.auth({ username, password })
    .then((isAuthorized) => {
      if (!isAuthorized) {
        res.status(401).send('not authorized');
        return;
      }

      // if auth, create a token
      const token = jwt.sign(
        { username, password },
        settings.jwt.secret,
        { expiresIn: 24 * 60 * 60 } // 24 hours
      );

      // return the information including token as JSON
      res.json({
        success: true,
        token,
      });
      return;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('error');
      return;
    });
});

// Start
const server = app.listen(settings.port || 3000, () => {
  const { address, port } = server.address();
  console.log(`Server listening on http://${address}:${port}`);
});
