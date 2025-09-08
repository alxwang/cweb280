const express = require('express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(passport.initialize());

const SECRET_KEY = 'mysecret';

// Mock user database
const users = [
  { id: 1, username: 'admin', email: 'admin@example.com' }
];

// Passport JWT strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    const user = users.find(u => u.id === jwt_payload.id);
    if (user) return done(null, user);
    else return done(null, false);
  })
);

// Login route to generate JWT
app.post('/login', (req, res) => {
  const { username } = req.body;
  const user = users.find(u => u.username === username);
  if (user) {
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid username' });
  }
});

// Public route
app.get('/public', (req, res) => {
  res.json({ message: 'This is a public route.' });
});

// Protected route
app.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: 'You have accessed a protected route!', user: req.user });
  }
);

// Profile route
app.get(
  '/api/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // return user info
    res.json({ id: req.user.id, username: req.user.username, email: req.user.email });
  }
);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
