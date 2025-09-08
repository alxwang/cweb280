const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 5000;

// Configure session middleware
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // 1 min
}));

// Set session variable
app.get('/login', (req, res) => {
  req.session.username = 'admin';
  res.send('Session started for user: admin');
});

// Read session variable
app.get('/profile', (req, res) => {
  if (req.session.username) {
    res.send(`Welcome ${req.session.username}, this is your profile page.`);
  } else {
    res.send('Please log in first.');
  }
});


// Destroy session
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Session destroyed, logged out.');
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
