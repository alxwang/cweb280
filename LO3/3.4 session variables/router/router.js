const express = require('express');
const router = express.Router();

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login form submit
router.post('/login', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.render('login', { error: 'Username is required' });
  }

  // Save user in session
  req.session.user = { username };
  res.redirect('/dashboard');
});

// Dashboard (protected)
router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('dashboard', { user: req.session.user });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send('Error logging out');

    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

module.exports = router;
