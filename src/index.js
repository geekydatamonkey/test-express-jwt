import express from 'express';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';

const app = express();

const quotes = [
  {
    author: 'Audrey Hepburn',
    text: "Nothing is impossible, the word itself says 'I'm possible'!",
  }, {
    author: 'Walt Disney',
    text: "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you",
  }, {
    author: 'Unknown',
    text: "Even the greatest was once a beginner. Don't be afraid to take that first step.",
  }, {
    author: 'Neale Donald Walsch',
    text: "You are afraid to die, and you're afraid to live. What a way to exist.",
  },
];


// Routes
app.get('/',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    res.json(quotes);
  }
);


// Basic Auth
const users = [
  {
    username: 'admin',
    password: '54321',
  }, {
    username: 'james',
    password: '12345',
  },
];

function basicAuth(username, password, cb) {
  const user = users.find(u => u.username === username);
  if (!user || user.password !== password) {
    // unauthorize
    return cb(null, false);
  }
  return cb(null, user);
}

passport.use(new BasicStrategy(basicAuth));

// Start
app.listen(process.env.PORT || 3000);
